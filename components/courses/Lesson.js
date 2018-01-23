import Link from 'next/link'
import { List } from 'semantic-ui-react'


// <pre style={{ fontSize: 10 }}>{JSON.stringify({ props }, null, 2)}</pre>


const csMonths = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];

const iconByMaterialType = {
  'handout': 'file text outline',
  'homework': 'home',
  'link': 'linkify',
  'lesson': 'graduation',
  '_default': 'chevron right',
};

const MaterialItem = (props) => {
  const { name, type, link } = props.material;
  const icon = iconByMaterialType[type] || iconByMaterialType['_default'];
  return (
    <List.Item>
      <List.Icon name={icon} style={{ maxWidth: 18 }} />
      <List.Content>
        {link ? (<a href={link} target='_blank'>{name}</a>) : name}
      </List.Content>
    </List.Item>
  );
};

const HomeworkItem = (props) => {
  const { homework, courseId } = props;
  return (
    <List.Item>
      <List.Icon name='home' />
      <List.Content>
        <Link
          href={{
            pathname: '/courses/homework',
            query: {
              courseId: courseId,
              homeworkId: homework.id,
            },
          }}
        >
          <a><strong>{homework.name}</strong></a>
        </Link>
      </List.Content>
    </List.Item>
  );
};

export default (props) => {
  const { lesson, courseId } = props;
  const date = new Date(lesson.date);
  return (
    <div className='Lesson'>
      <h3 className='lesson-title'>
        <span className='lesson-index'>
          {lesson.index+1}.
        </span>
        {' '}{lesson.name}{' '}
        <div style={{ float: 'right' }}>
          <span className='lesson-date'>
            {date.getDate()}. {csMonths[date.getMonth()]} {date.getFullYear()}
          </span>
        </div>
      </h3>

      {lesson.materials && (
        <List>
          {lesson.materials.map((m, n) => (
            <MaterialItem key={n} material={m} />
          ))}
        </List>
      )}

      {lesson.homeworks && (
        <List>
          {lesson.homeworks.map((hw, n) => (
            <HomeworkItem key={n} courseId={courseId} homework={hw} />
          ))}
        </List>
      )}

    </div>
  );
}
