import React from 'react'
import { Container } from 'semantic-ui-react'

import PageLayout from '../../components/PageLayout'
import CourseList from '../../components/courses/CourseList'
import fetchAPI from '../../util/fetchAPI'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return await fetchAPI(req, 'all-courses');
  }

  render() {
    return (
      <PageLayout activeMenuItem='courses' title='Kurzy' user={this.props.user}>
        <Container text>
          <div style={{ textAlign: 'center' }}>
            <CourseList courses={this.props.courses} />
          </div>
        </Container>
      </PageLayout>
    );
  }

}
