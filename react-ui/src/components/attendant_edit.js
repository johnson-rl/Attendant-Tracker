import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { updateAttendant } from '../actions/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AttendantEdit extends Component {
  constructor(props){
    super(props);

    this.state={
      initialValues: this.props.attendant
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.updateAttendant(this.props.attendant.id, props)
    .then(()=>{
      this.props.reFetch()
      this.props.editSwitch()
    })
    this.onSubmit.bind(this)
  }

  render () {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Edit Attendant</h3>
        <div>
          <label htmlFor="first_name">First Name</label>
          <Field name="first_name" component="input" type="text" value={this.props.attendant.first_name} />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <Field name="last_name" component="input" type="text" value={this.props.attendant.last_name} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="text"value={this.props.attendant.email} />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <Field name="phone" component="input" type="text"value={this.props.attendant.phone} />
        </div>
        <button type="submit" className="button-primary">Submit</button>
        <button className="button btn-danger" onClick={this.props.editSwitch}>Cancel</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {}
  if(!values.first_name){
    errors.first_name = 'Enter a first_name'
  }
  if(!values.last_name){
    errors.last_name = 'Enter a last name'
  }
  if(!values.email){
    errors.email = 'Enter an email'
  }
  if(!values.phone){
    errors.phone = 'Enter a phone number'
  }
  return errors
}

function mapStateToProps(state){
  return {initialValues:state.attendants.attendant}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateAttendant }, dispatch); //makes sure action flows to reducers
}

AttendantEdit =  reduxForm({ form: 'AttendantEditForm' })(AttendantEdit);
AttendantEdit = connect(mapStateToProps, mapDispatchToProps)(AttendantEdit);
export default AttendantEdit
