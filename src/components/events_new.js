import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createEvent } from '../actions/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropdownList, DateTimePicker} from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css'
import moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(moment);



class NewEvent extends Component {

  onSubmit(props) {
    console.log(props)
    // this.props.createEvent(this.props.id, props)
    // .then(()=>{
    //
    // })
    this.onSubmit.bind(this)
  }

  renderDropdownList = ({ input, ...rest }) => <DropdownList {...input} {...rest}/>

  dateTime = ({input, value, ...rest}) =>
    <DateTimePicker
    {...input}
    format='LL'
    value={value}
    onBlur={() => input.onBlur(value)}
    {...rest}
    />;

  render () {

    const { handleSubmit } = this.props;

    const colors = [ { color: 'Red', value: 'ff0000' },
    { color: 'Green', value: '00ff00' },
    { color: 'Blue', value: '0000ff' } ]

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" component="input" type="text"/>
          </div>
          <div>
            <label>Favorite Color</label>
            <Field
              name="favoriteColor"
              component={this.renderDropdownList}
              data={colors}
              valueField="value"
              textField="color"/>
          </div>
          <div>
            <label htmlFor="email">Date</label>
            <Field name="date" component={this.dateTime} type="text" className="date-picker" />
          </div>
          <div className="row">
            <button type="submit" className="button-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createEvent }, dispatch); //makes sure action flows to reducers
}

NewEvent =  reduxForm({ form: 'NewEventForm' })(NewEvent);
NewEvent = connect(null, mapDispatchToProps)(NewEvent);
export default NewEvent
