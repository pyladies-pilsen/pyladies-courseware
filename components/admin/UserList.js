import React from 'react'
import { Icon, Table } from 'semantic-ui-react'


const UserTable = (props) => {
  const { users } = props;
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Login</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map(user => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.displayName}</Table.Cell>
            <Table.Cell>
              {user.googleId && (
                <span>
                  <Icon name='google' />
                  <a href={`https://plus.google.com/${user.googleId}`} target='_blank'>
                    <small>{user.googleId}</small>
                  </a>
                </span>
              )}
              {user.facebookId && (
                <span>
                  <Icon name='facebook' />
                  <a href={`https://facebook.com/${user.facebookId}`} target='_blank'>
                    <small>{user.facebookId}</small>
                  </a>
                </span>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      usersLoading: false,
      usersError: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    this.setState({
      usersLoading: true,
    });
    try {
      const res = await fetch('/api/admin/user-list', {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        credentials: 'same-origin',
      });
      const { users } = await res.json();
      this.setState({
        users,
        usersLoading: false,
        usersError: null,
      });
    } catch (err) {
      this.setState({
        usersLoading: false,
        usersError: `Failed to load users: ${err.toString()}`,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.usersLoading && (<p><em>Loading...</em></p>)}
        {this.state.usersError && (<p className='error'>{this.state.usersError}</p>)}
        {this.state.users && (<UserTable users={this.state.users} />)}
      </div>
    );
  }

}
