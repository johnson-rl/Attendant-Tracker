import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchAttendants, deleteAttendant, sendSms } from '../actions/index';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

// Components
import UserInfo from './user_info'
import AttendantList from './attendant_list'
import Today from './today'
import NewAttendant from './new_attendant'

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      removeAttendants: false,
    };
    this.componentSwitch = this.componentSwitch.bind(this);
    this.attendantSwitch = this.attendantSwitch.bind(this);
    this.delAttendant = this.delAttendant.bind(this);
    this.pingNetwork = this.pingNetwork.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    this.props.fetchUser(this.props.params.id);
    this.props.fetchAttendants(this.props.params.id)
  }

  componentSwitch() {
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

  attendantSwitch() {
    if (this.state.removeAttendants === false) {
      this.setState({
        removeAttendants: true
      });
    } else {
      this.setState({
        removeAttendants: false,
      });
    }
  }

  delAttendant(id) {
    this.props.deleteAttendant(id)
  }

  pingNetwork(){
    let room = Math.floor(Math.random() * 1000000000)
    console.log(room)
    this.props.sendSms({message: `Hey this is ${this.props.user.first_name}! I could use some assistance.  Chat with me here: http://localhost:9000/room/${room}`})
    this.context.router.push(`/room/${room}`)
  }

  render () {

    if(!this.props.user  || !this.props.attendants) {
      return<div />
    }

    const events = [
      {date: "12:00pm",
      title: "Lunch",
      attendant: {first_name: "Shiv",
                  last_name: "Shiv",
                  email: "shiv@shiv.shiv",
                  phone: "415-415-4155"}
      },
      {date: "6:00pm",
      title: "Dinner",
      attendant: {first_name: "Mike",
                  last_name: "Mike",
                  email: "mike@mike.mike",
                  phone: "415-415-4155"}
      }
    ]

    return (
      <div className="container">
        <div className="row">
          <div className="four columns center-text">
            <UserInfo user={this.props.user}/>
            <Link to={`/users/${this.props.user.id}/calendar`}><h5>Calendar</h5></Link>
            <Today events={events} />
          </div>
          <div className="eight columns">
            <div className="row">
              <div className="four columns center-text">
                <button
                  onClick={this.pingNetwork}
                  className="ping">Ping Your Network</button>
              </div>
              <div className="four columns center-text">
                {this.state.showForm ?
                  <button onClick={this.componentSwitch} className="add-attendant">Cancel</button> :
                    <button onClick={this.componentSwitch} className="add-attendant">Add Attendant</button>
                  }
              </div>
              <div className="four columns center-text">
                {this.state.removeAttendants ?
                  <button onClick={this.attendantSwitch} className="remove-attendant">Cancel</button> :
                    <button onClick={this.attendantSwitch} className="remove-attendant">Remove Attendant</button>
                  }
              </div>
            </div>
            <div className="row">
              {this.state.showForm ?
                <NewAttendant id={this.props.params.id} componentSwitch={this.componentSwitch}/> :
                  <AttendantList
                    attendants={this.props.attendants}
                    removeAttendants={this.state.removeAttendants}
                    delAttendant={this.delAttendant}/>
                }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { user: state.user.user,
            attendants: state.attendants.attendants}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, fetchAttendants, deleteAttendant, sendSms }, dispatch); //makes sure action flows to reducers
}
// { fetchUser, fetchAttendants }
export default connect(mapStateToProps, mapDispatchToProps)(User);
