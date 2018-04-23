import * as EventsApiUtil from '../utils/event_utils';
export const RECEIVE_EVENTS  = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";

const receiveEvents = events => {
  return {
    type: RECEIVE_EVENTS,
    events
  };
};

const receiveEvent = event => {
  return {
    type: RECEIVE_EVENT,
    event
  };
};

export const fetchEvents = () => dispatch => (
  EventsApiUtil.fetchEvents()
                 .then(events => dispatch(receiveEvents(events)))
);

export const fetchEvent = eventId => dispatch => (
  EventsApiUtil.fetchEvent(eventId)
                 .then(event => dispatch(receiveEvent(event)))
);

export const createEvent = newEvent => dispatch => (
  EventsApiUtil.createEvent(newEvent)
                 .then(event => dispatch(receiveEvent(event)))
);

export const updateEvent = event => dispatch =>(
  EventsApiUtil.updateEvent(event)
                 .then(updatedEvent => dispatch(receiveEvent(updatedEvent)))
);
