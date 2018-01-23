import { Grid } from 'semantic-ui-react'

import PageLayout from '../PageLayout'
import AdminMenu from './AdminMenu'

export default (props) => {
  return (
    <PageLayout activeMenuItem='admin' headTitle='Administrace' user={props.user} className='admin'>

      <div style={{ marginTop: 25 }}>

        <Grid stackable>
          <Grid.Column width={3}>

            <AdminMenu activeItem={props.activeMenuItem} />

          </Grid.Column>
          <Grid.Column width={13}>

            {props.children}

          </Grid.Column>
        </Grid>

      </div>

    </PageLayout>

  );
};
