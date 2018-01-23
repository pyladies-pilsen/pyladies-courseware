import React from 'react'
import Link from 'next/link'
import { Container, Table, Icon } from 'semantic-ui-react'

import PageLayout from '../../components/PageLayout'
import fetchAPI from '../../util/fetchAPI'

const ConditionalStrong = (props) => (
  props.active ? (<strong>{props.children}</strong>) : props.children
);

const TopicRow = (props) => (
  <Table.Row>

    <Table.Cell collapsing>
      <big style={{ fontSize: 16, color: '#808080' }}>
        {props.answerCount}
      </big>
      {props.answered && (
        <Icon name='check' color='green' />
      )}
    </Table.Cell>

    <Table.Cell>
      <big style={{ fontSize: 16 }}>
        <ConditionalStrong active={!props.answerCount}>
          <Link href={{
            pathname: '/forum/topic',
            query: {},
          }}>
            <a>{props.title}</a>
          </Link>
        </ConditionalStrong>
      </big>
    </Table.Cell>

    <Table.Cell textAlign='right'>
      <small style={{ color: '#808080' }}>
        Před 10 minutami
      </small>
    </Table.Cell>

  </Table.Row>
);

export default class extends React.Component {

  static async getInitialProps({ req }) {
    return await fetchAPI(req, 'forum-index');
  }

  render() {
    return (
      <PageLayout activeMenuItem='forum' title='Fórum' user={this.props.user}>

        <Container text>

          <Table basic='very'>
            <Table.Body>

              <TopicRow
                title='České znaky v gitu'
                answerCount={0}
              />

              <TopicRow
                title='Kde se používá print sep'
                answerCount={2}
                answered={true}
              />

            </Table.Body>
          </Table>

        </Container>

      </PageLayout>
    );
  }

}
