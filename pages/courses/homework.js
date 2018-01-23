import React from 'react'
import { Container, Grid, Button } from 'semantic-ui-react'

import fetchAPI from '../../util/fetchAPI'
import PageLayout from '../../components/PageLayout'
import CodeEditor from '../../components/CodeEditor'
import HomeworkSubmenu from '../../components/courses/HomeworkSubmenu'

const sampleValue = "# Sem napiš nebo vlož tvůj kód :)\n\n\n\n\n\n";

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
          activeItem='submit'
        />

        <Container text>
          <p>Tvoje řešení:</p>

          <CodeEditor value={sampleValue} />

          <br />

          <div>

            <Button
              basic
              disabled
              content='Zrušit úpravy'
            />


            <Button
              color='red'
              content='Uložit'
            />

            <Button
              color='green'
              content='Odevzdat'
            />

          </div>
        </Container>

      </PageLayout>
    );
  }

}
