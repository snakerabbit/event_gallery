import { RECEIVE_EVENTS, RECEIVE_EVENT} from '../actions/events_actions';
import merge from 'lodash/merge';

const EventsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events;
    case RECEIVE_EVENT:
    let newState = merge({}, state);
    return merge(newState, {[action.event.id]: action.event});
    default:
      return state;
  }
};

export default EventsReducer;
