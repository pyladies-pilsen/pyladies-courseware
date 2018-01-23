import React from 'react'
import { Icon, Button, Label, Menu, Table } from 'semantic-ui-react'


const CourseTable = (props) => {
  const { courses } = props;
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Login</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {courses.map(course => (
          <Table.Row key={course.id}>
            <Table.Cell><code>{course.id}</code></Table.Cell>
            <Table.Cell>{course.title}</Table.Cell>
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
      courses: null,
      coursesLoading: false,
      coursesError: null,
    };
  }

  componentDidMount() {
    this.fetchCourses();
  }

  async fetchCourses() {
    this.setState({
      coursesLoading: true,
    });
    try {
      const res = await fetch('/api/admin/course-list', {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        credentials: 'same-origin',
      });
      const { courses } = await res.json();
      this.setState({
        courses,
        coursesLoading: false,
        coursesError: null,
      });
    } catch (err) {
      this.setState({
        coursesLoading: false,
        coursesError: `Failed to load courses: ${err.toString()}`,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.coursesLoading && (<p><em>Loading...</em></p>)}
        {this.state.coursesError && (<p className='error'>{this.state.coursesError}</p>)}
        {this.state.courses && (<CourseTable courses={this.state.courses} />)}
      </div>
    );
  }

}
