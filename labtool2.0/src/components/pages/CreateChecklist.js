import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, TextArea, Header, Input, Label, Button } from 'semantic-ui-react'
import { showNotification } from '../../reducers/notificationReducer'
import { createChecklist, getOneChecklist } from '../../services/checklist'
import { getOneCI } from '../../services/courseInstance'
import { resetChecklist, changeString } from '../../reducers/checklistReducer'

export class CreateChecklist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      week: 1
    }
  }

  componentWillMount() {
    this.props.resetChecklist()
    this.props.getOneCI(this.props.courseId)
  }

  // Make api call to save checklist to database.
  handleSubmit = async e => {
    console.log(e.target.submit.value)
    e.preventDefault()
    if (this.state.week <= 0 || this.state.week > this.props.selectedInstance.weekAmount) {
      this.props.showNotification({
        message: 'Invalid week.',
        error: true
      })
      return
    }
    try {
      const json = JSON.parse(e.target.json.value)
      this.props.createChecklist({
        courseInstanceId: this.props.selectedInstance.id,
        week: this.state.week,
        checklist: json
      })
    } catch (e) {
      this.props.showNotification({
        message: 'Could not parse JSON.',
        error: true
      })
    }
  }

  changeWeek = async e => {
    this.setState({
      week: Number(e.target.value)
    })
  }

  // Make api call to receive checklist from database.
  loadChecklist = async e => {
    this.props.getOneChecklist({
      week: this.state.week,
      courseInstanceId: this.props.selectedInstance.id
    })
  }

  changeTextArea = async e => {
    this.props.changeString(e.target.value)
  }

  render() {
    return (
      <div className="CreateChecklist">
        <Header>{this.props.selectedInstance.name}</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Label>Week </Label>
            <Input type="number" name="week" step="1" value={this.state.week} onChange={this.changeWeek} style={{ width: '100px', marginRight: '10px' }} />
            <Button type="button" onClick={this.loadChecklist}>
              Load checklist
            </Button>
          </Form.Field>
          <Form.Field>
            <Label>Checklist as JSON</Label>
            <TextArea name="json" rows="20" value={this.props.checklist.string} onChange={this.changeTextArea} />
          </Form.Field>
          <Button type="submit">Save</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    selectedInstance: state.selectedInstance,
    checklist: state.checklist
  }
}

const mapDispatchToProps = {
  showNotification,
  createChecklist,
  getOneCI,
  getOneChecklist,
  resetChecklist,
  changeString
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChecklist)
