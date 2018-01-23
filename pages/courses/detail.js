import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

import PageLayout from '../../components/PageLayout'
import Lesson from '../../components/courses/Lesson'
import fetchAPI from '../../util/fetchAPI'

// <pre>{JSON.stringify({ props: this.props, state: this.state }, null, 2)}</pre>

export default class extends React.Component {

  static async getInitialProps({ req, query }) {
    const { courseId } = query;
    return await fetchAPI(req, 'course-detail', { courseId });
  }

  render() {
    const { course, lessons, lastLesson, nextLesson } = this.props;
    return (
      <PageLayout
       activeMenuItem='courses'
       title={course.title}
       user={this.props.user}
      >

        <style jsx>{`
          h2 {
            border-bottom: 1px solid black;
          }
        `}</style>

        {lastLesson && nextLesson && (
          <Grid columns={2} relaxed stackable>
            <Grid.Column>
              <h2>Předchozí lekce</h2>
              <Lesson courseId={course.id} lesson={lastLesson} />
            </Grid.Column>
            <Grid.Column>
              <h2>Následující lekce</h2>
              <Lesson courseId={course.id} lesson={nextLesson} />
            </Grid.Column>
          </Grid>
        )}

        <h2>Všechny lekce</h2>

        <Container text>

        {lessons.map(lesson => (
            <Lesson courseId={course.id} lesson={lesson} />
        ))}
      </Container>
      </PageLayout>
    );
  }

}
