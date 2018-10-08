import React, { Component } from 'react';
import SlideItem from './SlideItem';
import imgs from './assets/images';

class App extends Component {

  render() {
    console.log('test', imgs);
    return (
      <div>
        <ul>
          <SlideItem content={imgs} />
        </ul>
      </div>
    );
  }
}

export default App;