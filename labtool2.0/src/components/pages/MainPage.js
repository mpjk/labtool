import React, { Component } from 'react'
import './MainPage.css'

class MainPage extends Component {


  render() {

    return (
      <div className="MainPage">
        <h2>Student / Teacher</h2>
        <h2> View </h2>
        <button
          onClick={this.props.logout}>
          Logout
        </button>
      </div>
    )
  }
}





export default MainPage