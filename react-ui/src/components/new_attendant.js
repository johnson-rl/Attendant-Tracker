import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createAttendant } from '../actions/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NewAttendant extends Component {

  onSubmit(props) {
    this.props.createAttendant(this.props.id, props)
    .then(()=>{
      this.props.componentSwitch()
    })
    this.onSubmit.bind(this)
  }

  render () {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Register a New Attendant</h3>
        <div>
          <label htmlFor="first_name">First Name</label>
          <Field name="first_name" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <Field name="last_name" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <Field name="phone" component="input" type="text"/>
        </div>
        <button type="submit" className="button-primary">Submit</button>
        <Link to="/" className="button btn-danger">Cancel</Link>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createAttendant }, dispatch); //makes sure action flows to reducers
}

NewAttendant =  reduxForm({ form: 'NewAttendantForm' })(NewAttendant);
NewAttendant = connect(null, mapDispatchToProps)(NewAttendant);
export default NewAttendant
