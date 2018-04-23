import React from 'react';
import GalleryItem from './gallery_item';
class Gallery extends React.Component {
  constructor(props){
    super(props);
    this.renderPosts = this.renderPosts.bind(this);
  }

  componentDidMount(){
    let id = this.props.match.params.event_id;
    this.props.fetchEvent(id);
    this.props.fetchMetaData(id);
    var ws = new WebSocket('ws://localhost:40510');
    let event = this.props.event;
    let props = this.props;
    if(this.props.event){
      ws.onopen = function () {
        if(event){
          ws.send(JSON.stringify(event))
        }
      }
      ws.onmessage = function (ev) {
        if(event){
          console.log(props);
          console.log(event._id);
          props.fetchEvent(event._id);
          props.fetchMetaData(event._id);
        }
      }
    }

  }

  getData(){

  }

  renderPosts(){
    if(this.props.event.posts.length === 0){
      return(
        <div>No Posts Found</div>
      )
    }
    return(
      <div className ='posts'>
        {this.props.event.posts.map(post =>{
          return(
            <div>
              {this.props.event.posts.map(post =>{
                return(
                  <GalleryItem post={post}/>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  render(){
    if(this.props.event && this.props.metadata){
      return(
        <div className='gallery'>
          <h1 id='gallery-title'>{`${this.props.event.name}`}</h1>
          <div className='subheader'>
            <div className='metadata'>
              <p>{`#${this.props.event.hashtag}`}</p>
              <p style={{color:'lightgrey'}}>{`${this.props.metadata.postsCount} posts // ${this.props.metadata.userCount} users`}</p>
            </div>
            <form className='search-form'>
              <input type='text' placeholder='Search'/>
              <input style={{backgroundColor:'black', color:'white'}} type='submit' value='Search'/>
            </form>
            </div>
            {this.renderPosts()}
        </div>
      )
    } else{
      return(
        <div>
          loading
        </div>
      )
    }

  }
}

export default Gallery;
