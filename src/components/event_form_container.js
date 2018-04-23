import { connect } from 'react-redux';
import EventForm from './event_form';
import { createEvent, fetchEvents } from '../actions/events_actions';


const mapStateToProps = state => {
  return({
    events: state.events
  });
};


const mapDispatchToProps = dispatch => {
  return({
    createEvent: (event) => dispatch(createEvent(event)),
    fetchEvents: () => dispatch(fetchEvents())
  });
};


export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
