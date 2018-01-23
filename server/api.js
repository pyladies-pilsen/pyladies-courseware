import { Router } from 'express'

const factories = {};

const router = Router();

export default { router, factories };

const asyncWrapper = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/admin/user-list', asyncWrapper(async (req, res) => {
  const model = await req.getModel();
  const users = await model.users.getAll();
  res.json({ users: users.map(u => u.exportData()) });
}));

router.get('/admin/course-list', asyncWrapper(async (req, res) => {
  const model = await req.getModel();
  const courses = await model.getCourses();
  res.json({ courses: courses.map(c => c.exportData()) });
}));

router.post('/:key', asyncWrapper(async (req, res) => {
  const { key } = req.params;
  const f = factories[key];
  const result = await f(req, req.body);
  res.json(result);
}));

factories['index-info'] = async (req) => {
  return {
    user: req.user ? await req.user.get() : null,
  };
};

factories['login-info'] = async (req) => {
  return {
    user: req.user ? await req.user.get() : null,
    devMode: req.devMode || req.allowTestLogins,
  };
};

factories['forum-index'] = async (req) => {
  return {
    user: req.user ? await req.user.get() : null,
  };
};

factories['admin-index'] = async (req) => {
  return {
    user: req.user ? await req.user.get() : null,
  };
};
factories['all-courses'] = async (req) => {
  const model = await req.getModel();
  const courses = await model.getCourses();
  return {
    user: req.user ? await req.user.get() : null,
    courses: courses.map(c => c.exportData()),
  };
};

factories['course-detail'] = async (req, { courseId }) => {
  const model = await req.getModel();
  const courses = await model.getCourses();
  const course = courses.find(c => c.id === courseId);
  const lessons = await course.getLessons();
  return {
    user: req.user ? await req.user.get() : null,
    course: course.exportData(),
    lessons: lessons.map(l => l.exportData()),
    lastLesson: findLastLesson(lessons),
    nextLesson: findNextLesson(lessons),
  };
};

factories['homework-detail'] = async (req, { courseId, homeworkId }) => {
  const model = await req.getModel();
  const courses = await model.getCourses();
  const course = courses.find(c => c.id === courseId);
  const lessons = await course.getLessons();
  const homework = findHomeworkInLessons(homeworkId, lessons);
  return {
    user: req.user ? await req.user.get() : null,
    course: course.exportData(),
    homework: homework,
  };
};

const findHomeworkInLessons = (homeworkId, lessons) => {
  for (let l of lessons) {
    for (let h of l.homeworks) {
      if (h.id === homeworkId) {
        return h;
      }
    }
  }
  throw new Error(`Homework "${homeworkId}" not found.`);
};

const findLastLesson = (lessons, now) => {
  now = now || new Date();
  now = now * 1;
  var lastLesson = null;
  var lastDate = null;
  for (let lesson of lessons) {
    const lessonDate = lesson.date * 1;
    if (lessonDate < now) {
      if (lastDate === null || lastDate < lessonDate) {
        lastLesson = lesson;
        lastDate = lessonDate;
      }
    }
  }
  return lastLesson;
};

const findNextLesson = (lessons, now) => {
  now = now || new Date();
  now = now * 1;
  var nextLesson = null;
  var nextDate = null;
  for (let lesson of lessons) {
    const lessonDate = lesson.date * 1;
    if (lessonDate >= now) {
      if (nextDate === null || nextDate > lessonDate) {
        nextLesson = lesson;
        nextDate = lessonDate;
      }
    }
  }
  return nextLesson;
};
