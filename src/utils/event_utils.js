var $ = require("jquery");


export const fetchEvents = () => {
  return $.ajax({
    method: "GET",
    url: "http://localhost:3001/api/events"
  });
};

export const fetchEvent = id => {
  return (
    $.ajax({
      method: "GET",
      url: `api/events/${id}`
    })
  );
};

export const createEvent = event => {
  return $.ajax({
    method: "POST",
    url: "http://localhost:3001/api/events",
    data: {event}
  });
};

export const updateEvent = event => {
  return $.ajax({
    method: "PATCH",
    url: `api/events/${event.id}`
  });
};
