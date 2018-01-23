import React from 'react'
import Link from 'next/link'

const CourseItem = (props) => {
  const { course } = props;
  return (
    <p>
      <big>
        <Link
          href={{
            pathname: '/courses/detail',
            query: { courseId: course.id },
          }}
          prefetch
        >
          <a>{course.title}</a>
        </Link>
      </big>
    </p>
  );
};

export default class extends React.Component {

  render() {
    return (
      <div>
        {this.props.courses.map(c => (
          <CourseItem key={c.id} course={c} />
        ))}
      </div>
    );
  }

}
