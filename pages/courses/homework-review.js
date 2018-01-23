import React from 'react'
import { Container, Grid, Button } from 'semantic-ui-react'

import fetchAPI from '../../util/fetchAPI'
import PageLayout from '../../components/PageLayout'
import HomeworkSubmenu from '../../components/courses/HomeworkSubmenu'
import ReviewBox from '../../components/review/ReviewBox'

export default class extends React.Component {

  static async getInitialProps({ req, query }) {
    const { courseId, homeworkId } = query;
    return await fetchAPI(req, 'homework-detail', { courseId, homeworkId });
  }

  render() {
    const { course, homework } = this.props;
    const { courseId, homeworkId } = this.props.url.query;
    return (
      <PageLayout
       activeMenuItem='courses'
       title={homework.name}
       user={this.props.user}
      >

        <HomeworkSubmenu
          courseId={courseId}
          homeworkId={homeworkId}
          activeItem='review'
        />

        <ReviewBox
          authorName='Jana Nováková'
          courseId={courseId}
          homeworkId={homeworkId}
          atHomeworkPage={true}
        />

        <ReviewBox
          authorName='Lucie Millerová'
          courseId={courseId}
          homeworkId={homeworkId}
          atHomeworkPage={true}
        />

      </PageLayout>
    );
  }

}
