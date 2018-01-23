import { Container, Header } from 'semantic-ui-react'

import CustomHead from './CustomHead'
import MainMenu from './MainMenu'

export default (props) => {
  const { className, activeMenuItem, user, title, headTitle } = props;
  return (
    <div className={className}>
      <CustomHead title={headTitle || title} />
      <Container>

        <MainMenu activeItem={activeMenuItem} user={user} />

        {!props.title ? null : (
          <Header as='h1' textAlign='center' content={title} />
        )}

        {props.children}

      </Container>
      <div style={{ clear: 'both', height: 50 }}></div>
    </div>
  );
};
