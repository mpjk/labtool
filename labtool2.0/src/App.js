import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Courses from './components/pages/Courses'
import Login from './Login'
import { connect } from 'react-redux'
import { courseInstanceInitialization } from './reducers/courseInstanceReducer'
import LoginPage from './components/pages/LoginPage';
import { Container } from 'semantic-ui-react'
import Notification from './components/pages/Notification'
import RegisterPage from './components/pages/RegisterPage';
class App extends React.Component {

  componentDidMount() {
    this.props.courseInstanceInitialization()
  }

  render() {

    return (
      <Container>
        <div>
          {/* <Header /> */}
          <Notification />
          <Main />
        </div>
      </Container>
    )
  }
}

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/labtool' component={Login} />
<<<<<<< HEAD
        <Route exact path='/labtool/courses' render={({ history }) =>
          <Courses history={history} />} 
=======
        <Route path='/labtool/courses' render={({ history }) =>
          <Courses history={history} />}
>>>>>>> a662fb4399e177f3ef4e6b56ac1e98e8d78c135f
        />
        <Route exact path='/labtool' render={({ history }) =>
          <LoginPage history={history} />}
        />
        <Route path="/labtool/courses/:id" render={({ match, history }) =>
          <RegisterPage history={history} courseinstanceId={(match.params.id)} />}
        />
        {/* <Route path='/schedule' component={Schedule} /> */}
      </Switch>
    </main>
  )
}

export default withRouter(connect(
  null,
  { courseInstanceInitialization }
)(App))
