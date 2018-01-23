import React from 'react'

import PageLayout from '../components/PageLayout'
import fetchAPI from '../util/fetchAPI'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return await fetchAPI(req, 'index-info');
  }

  render() {
    return (
      <PageLayout user={this.props.user}>
      </PageLayout>
    );
  }

}
