import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchAttendant, deleteAttendant, updateAttendant } from '../actions/index';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import UserInfo from './user_info'
import CalendarItem from './calendar_item'
import AttendantEdit from './attendant_edit'

class Attendant extends Component {
  constructor(props){
    super(props)

    this.state = {
      deleteCheck : false,
      showForm : false
    }

    this.doubleCheck = this.doubleCheck.bind(this)
    this.delAttendant = this.delAttendant.bind(this)
    this.editSwitch = this.editSwitch.bind(this)
    this.reFetch = this.reFetch.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    this.props.fetchAttendant(this.props.params.id)
  }

  reFetch(){
    this.props.fetchAttendant(this.props.params.id)
  }

  doubleCheck(){
    if(this.state.deleteCheck === false){
      this.setState({deleteCheck : true})
    } else {
      this.setState({deleteCheck : false})
    }
  }

  delAttendant() {
    this.props.deleteAttendant(this.props.params.id)
    this.context.router.push(`/users/${this.props.attendant.userId}`);
  }

  editSwitch() {
    if (this.state.showForm === true) {
      this.setState({
        showForm: false
      });
      this.props.fetchAttendants(this.props.params.id)
    } else {
      this.setState({
        showForm: true,
      });
    }
  }

  render() {
    if(!this.props.attendant) {
      return<div />
    }

    const attendantEvents = this.props.attendant.events.map((event) => {
      return (<CalendarItem event={event} />)
    })

    return(
      <div className="container">
        <div className="row">
          <div className="four columns center-text">
            <UserInfo user={this.props.attendant}/>
            <div className="row">
              {this.state.deleteCheck ?
                <div>
                  <h5>Are your sure?</h5>
                  <div className="row">
                    <div className="six columns">
                      <button
                        className="add-attendant full-width"
                        onClick={this.doubleCheck}
                        >Cancel
                      </button>
                    </div>
                    <div className="six columns">
                      <button
                        className="remove-attendant full-width"
                        onClick={this.delAttendant}
                        >Delete
                      </button>
                    </div>
                  </div>
                </div>
              : <div>
              <div className="six columns">
                <button to="/"
                  className="add-attendant full-width"
                  onClick={this.editSwitch}
                  >Edit</button>
              </div>
              <div className="six columns">
                <button
                  className="remove-attendant full-width"
                  onClick={this.doubleCheck}
                  >Delete</button>
              </div>
              </div>}
            </div>
          </div>
          <div className="eight columns">
            {this.state.showForm ?
              <AttendantEdit
                  attendant={this.props.attendant}
                  editSwitch={this.editSwitch}
                  reFetch={this.reFetch}
                />
            : <div>
                <h5>Upcoming Schedule</h5>
                <hr />
                {attendantEvents}
              </div>    }
          </div>
        </div>

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
