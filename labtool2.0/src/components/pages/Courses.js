import React, { Component } from 'react'
import { Button, List, Container, Header, Table, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Courses extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header as="h2">Courses</Header>
          <Table singleLine color="yellow">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="1"> </Table.HeaderCell>
                <Table.HeaderCell colSpan="1">Course id</Table.HeaderCell>
                <Table.HeaderCell colSpan="1">Course name</Table.HeaderCell>
                <Table.HeaderCell colSpan="1">Course start date</Table.HeaderCell>
                <Table.HeaderCell colSpan="2"> </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.courseInstance.map(instance => (
                <Table.Row key={instance.key}>
                  <Table.Cell>
                    <div>
                      {instance.active === true ? (
                        <Label ribbon style={{ backgroundColor: '#21ba45' }}>
                          Active
                        </Label>
                      ) : (
                          ''
                        )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{instance.ohid} </Table.Cell>
                  <Table.Cell>
                    <bold>
                      <a href={`/labtool/courses/${instance.ohid}`}>{instance.name}</a>
                    </bold>
                  </Table.Cell>

                  <Table.Cell>{instance.start.substring(0, 10)} </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button circular size="tiny" icon="large blue eye icon" as={Link} to={`/labtool/courses/${instance.ohid}`} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <div className="Instructions">
            <List>
              <List.Item icon="blue eye icon" content="Show course page" />
              <List.Item icon="green square" content="Course is activated" />
            </List>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courseInstance: state.courseInstance
  }
}

export default connect(mapStateToProps, null)(Courses)
