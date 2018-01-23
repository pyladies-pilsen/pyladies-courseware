import { join as joinPath, dirname } from 'path'
import yaml from 'js-yaml'
import fs from 'fs'
import Promise from 'bluebird'
import glob from 'glob-promise'
import { ObjectID } from 'mongodb'

const asyncReadFile = Promise.promisify(fs.readFile);
const asyncStat = Promise.promisify(fs.stat);

const readYAMLCache = {};

const readYAML = async (path) => {
  const st = await asyncStat(path);
  const key = [path, st.size, st.mtime * 1];
  const keyStr = JSON.stringify(key);
  if (readYAMLCache[keyStr]) {
    //console.info('Cache hit:', path);
    return readYAMLCache[keyStr];
  } else {
    console.info('Loading:', path);
    const content = await asyncReadFile(path);
    const data = yaml.safeLoad(content);
    readYAMLCache[keyStr] = data;
    return data;
  }
};

class Lesson {

  constructor(baseDir, data) {
    this.baseDir = baseDir;
    this.name = data['name'];
    this.date = new Date(data['date']);
    this.materials = data['materials'] || [];
    this.homeworks = data['homeworks'] || [];
    this.index = null; // index assigned later by parent object
  }

  exportData() {
    return {
      name: this.name,
      date: this.date,
      materials: this.materials,
      homeworks: this.homeworks,
      index: this.index,
    };
  }

}

class Course {

  constructor(baseDir, data) {
    this.baseDir = baseDir;
    this.id = data['id'];
    this.title = data['title'];
    this.inlineLessons = data['lessons'] || [];
    if (!this.id) throw new Error('Course id missing');
    if (!this.title) throw new Error('Course title missing');
  }

  exportData() {
    return {
      id: this.id,
      title: this.title,
    };
  }

  async getLessons() {
    const lessons = this.inlineLessons.map(d => new Lesson(this.baseDir, d));
    lessons.map((l, n) => { l.index = n; });
    return lessons;
  }

}

const loadCourseFromFile = async (path) => {
  const data = await readYAML(path);
  return new Course(dirname(path), data['course']);
};

class User {

  constructor(doc) {
    this.id = doc['_id'].toHexString();
    this.displayName = doc['displayName'] || null;
    this.googleId = doc['googleId'] || null;
    this.facebookId = doc['facebookId'] || null;
  }

  exportData() {
    return {
      id: this.id,
      displayName: this.displayName,
      googleId: this.googleId,
      facebookId: this.facebookId,
    };
  }

}

class Users {

  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const collection = this.db.collection('users');
    const docs = await collection.find({}).toArray();
    return docs.map(doc => new User(doc));
  }

  async getById(userId) {
    const collection = this.db.collection('users');
    const doc = await collection.findOne({ _id: new ObjectID(userId) });
    return new User(doc);
  }

  async getOrCreateByGoogleId({ googleId, displayName }) {
    const collection = this.db.collection('users');
    await collection.createIndex('googleId', { unique: true, sparse: true });
    await collection.updateOne(
      { googleId },
      { $set: { displayName } },
      { upsert: true })
    const doc = await collection.findOne({ googleId });
    return new User(doc);
  }

  async getOrCreateByFacebookId({ facebookId, displayName }) {
    const collection = this.db.collection('users');
    await collection.createIndex('facebookId', { unique: true, sparse: true });
    await collection.updateOne(
      { facebookId },
      { $set: { displayName } },
      { upsert: true })
    const doc = await collection.findOne({ facebookId });
    return new User(doc);
  }

}

class Model {

  constructor(dataDir, data, mongoClient) {
    this.dataDir = dataDir;
    this.inlineCourses = data['courses'] || [];
    this.courseFiles = data['course_files'] || [];
    this.users = new Users(mongoClient);
  }

  async getCourses() {
    const courses = this.inlineCourses.map(d => new Course(this.dataDir, d));
    for (let pattern of this.courseFiles) {
      const paths = await glob(joinPath(this.dataDir, pattern));
      for (let path of paths) {
        courses.push(await loadCourseFromFile(path));
      }
    }
    return courses;
  }

}

const getModel = async ({ dev, dataDir, mongoClient }) => {
  const data = await readYAML(joinPath(dataDir, 'index.yaml'));
  return new Model(dataDir, data['pyladies_data'], mongoClient);
};

export default getModel;
