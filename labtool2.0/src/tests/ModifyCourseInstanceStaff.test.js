import React from 'react'
import ReactDOM from 'react-dom'
import { ModifyCourseInstanceStaff } from '../components/pages/ModifyCourseInstanceStaff'
import { shallow } from 'enzyme'
import { Container, Table, Label } from 'semantic-ui-react'
import { clearNotifications } from '../reducers/notificationReducer'

describe.only('<ModifyCourseInstanceStaff />', () => {
  let wrapper
  let mym = jest.fn()
  let selectedI = {
    id: 10013,
    name: 'Aineopintojen harjoitustyö: Tietokantasovellus',
    start: '2018-01-16T21:00:00.000Z',
    end: '2018-03-10T21:00:00.000Z',
    active: true,
    weekAmount: 7,
    weekMaxPoints: 3,
    currentWeek: 1,
    ohid: 'TKT20011.2018.K.A.1',
    teacherInstances: [
      {
        id: 1003,
        admin: 'true',
        createdAt: '2018-01-16T21:00:00.000Z',
        updatedAt: '2018-01-16T21:00:00.000Z',
        userId: 10010,
        courseInstanceId: 10013
      }
    ],
    createdAt: '2018-03-26T00:00:00.000Z',
    updatedAt: '2018-05-28T13:13:32.540Z'
  }
  const courseId = selectedI['ohid']
  const users = [
    {
      id: 10010,
      username: 'paaopettaja',
      email: 'paa.opettaja@helsinki.fi',
      firsts: 'Pää',
      lastname: 'Opettaja',
      admin: true,
      createdAt: '2018-03-26T00:00:00.000Z',
      updatedAt: '2018-03-26T00:00:00.000Z'
    },
    {
      id: 10011,
      username: 'paaopettaja',
      email: 'paa.opettaja@helsinki.fi',
      firsts: 'Sivu',
      lastname: 'Opiskelija',
      studentNumber: '014822548',
      admin: false,
      createdAt: '2018-03-26T00:00:00.000Z',
      updatedAt: '2018-03-26T00:00:00.000Z'
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<ModifyCourseInstanceStaff courseId={5} users={users} selectedInstance={selectedI} getAllUsers={mym} getOneCI={mym} createOne={mym} clearNotifications={mym} />)
  })

  describe('Components', () => {
    it('renders correctly', () => {
      expect(wrapper.length).toEqual(1)
    })

    it('shows correct amount of users', () => {
      // Two users and the table header which is also rendered as a row
      expect(wrapper.find(Table.Row).length).toEqual(3)
    })

    it('shows the correct amount of labels', () => {
      expect(wrapper.find(Label).length).toEqual(2)
    })
    it('shows the correct name and label for teacher of the course', () => {
      const name = wrapper.find(Table.Cell).at(0)
      const status = wrapper.find(Label).at(0)
      expect(name.props().children[0] + ' ' + name.props().children[2]).toEqual('Pää Opettaja')
      expect(status.props().children).toEqual('Admin')
    })

    it('shows the correct name and label for student of the course', () => {
      const name = wrapper.find(Table.Cell).at(2)
      const status = wrapper.find(Label).at(1)
      expect(name.props().children[0] + ' ' + name.props().children[2]).toEqual('Sivu Opiskelija')
      expect(status.props().children).toEqual('Non-admin')
    })
  })
})
