import React from 'react'

import AdminPageLayout from '../../components/admin/AdminPageLayout'
import fetchAPI from '../../util/fetchAPI'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return await fetchAPI(req, 'admin-index');
  }

  render() {
    return (
      <AdminPageLayout user={this.props.user} activeMenuItem='index'>
      </AdminPageLayout>
    );
  }

}
