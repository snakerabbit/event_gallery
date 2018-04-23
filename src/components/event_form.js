import React from 'react';

class EventForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      hashtag:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field){
    return e => this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    let newEvent = this.state;
    this.props.createEvent(newEvent);
  }
  componentDidMount(){
    this.props.fetchEvents();
  }

  render(){
    console.log(this.state);
    return(
      <div>
        <form>
        <label>Event Name
          <input type="text" onChange={this.handleChange('name')}></input>
        </label>
        <label>Hashtag
          <input type="text" onChange={this.handleChange('hashtag')}></input>
        </label>
        <input type='submit' value='Create Event'/>
        </form>
      </div>
    )
  }
}

export default EventForm;
