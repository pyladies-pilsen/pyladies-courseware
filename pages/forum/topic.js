import React from 'react'
import Link from 'next/link'
import { Container, Table, Icon } from 'semantic-ui-react'

import PageLayout from '../../components/PageLayout'
import fetchAPI from '../../util/fetchAPI'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return await fetchAPI(req, 'forum-index');
  }

  render() {
    const title = 'České znaky v gitu';
    return (
      <PageLayout activeMenuItem='forum' title={title} user={this.props.user}>

        <Container text>

          <p>TODO :)</p>

        </Container>

      </PageLayout>
    );
  }

}
