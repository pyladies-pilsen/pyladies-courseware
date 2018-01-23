import React from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'

import PageLayout from '../components/PageLayout'
import fetchAPI from '../util/fetchAPI'

const styles = {
  center: {
    textAlign: 'center',
  },
  loginButton: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
};

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return await fetchAPI(req, 'login-info');
  }

  render() {
    //const { devMode }  = this.props;
    const devMode = false;
    return (
      <PageLayout activeMenuItem='login' title='Přihlásit se' user={this.props.user}>
        <Container text>
          <div style={styles.center}>

            <Button color='facebook' style={styles.loginButton} as='a' href='/auth/facebook/'>
              <Icon name='facebook' /> Přihlásit se přes Facebook
            </Button>

            <Button color='google plus' style={styles.loginButton} as='a' href='/auth/google/'>
              <Icon name='google' /> Přihlásit se přes Google
            </Button>

          </div>
          {devMode && (
            <div style={{marginTop: 20, ...styles.center}}>
              <p>Pouze ve vývojovém režimu:</p>

              <form action='/auth/as-student' method='post'>
                <Button color='grey' style={styles.loginButton}>
                  <Icon name='sign in' /> Přihlásit se jako účastník
                </Button>
              </form>

              <form action='/auth/as-coach' method='post'>
                <Button color='grey' style={styles.loginButton}>
                  <Icon name='sign in' /> Přihlásit se jako kouč
                </Button>
              </form>

              <form action='/auth/as-admin' method='post'>
                <Button color='grey' style={styles.loginButton}>
                  <Icon name='sign in' /> Přihlásit se jako správce
                </Button>
              </form>

            </div>
          )}
        </Container>
      </PageLayout>
    );
  }

}
