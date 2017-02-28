import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendant, deleteAttendant, updateAttendant } from '../actions/index';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import UserInfo from './user_info'
import CalendarDay from './calendar_day';

class Attendant extends Component {
  componentWillMount(){
    console.log("id", this.props.params.id)
    this.props.fetchAttendant(this.props.params.id)
  }

  render() {
    if(!this.props.attendant) {
      return<div />
    }
    return(
      <div>
        <h1>Hi I'm Shiv!</h1>
        <h3>{this.props.attendant.first_name}</h3>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { attendant: state.attendants.attendant}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAttendant, deleteAttendant, updateAttendant }, dispatch); //makes sure action flows to reducers
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendant)
