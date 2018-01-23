import React from 'react'

import PageLayout from '../../components/PageLayout'
import fetchAPI from '../../util/fetchAPI'
import ReviewBox from '../../components/review/ReviewBox'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return await fetchAPI(req, 'forum-index');
  }

  render() {
    const courseId = 'xxx';
    const homeworkId = 'xxx';
    return (
      <PageLayout activeMenuItem='homeworks' title='Domácí úkoly' user={this.props.user}>

        <h2>K odevzdání</h2>

        <p>(Z pohledu účastnice a jejích zapsaných kurzů)</p>

        <h2>Odevzdané</h2>

        <p>(Z pohledu účastnice a jejích zapsaných kurzů)</p>

        <h2>Čekající na review</h2>

        <p>(Toto uvidí jen koučové)</p>

        <ReviewBox
          authorName='Jana Nováková'
          courseId={courseId}
          homeworkId={homeworkId}
        />

        <ReviewBox
          authorName='Lucie Millerová'
          courseId={courseId}
          homeworkId={homeworkId}
        />

      </PageLayout>
    );
  }

}
