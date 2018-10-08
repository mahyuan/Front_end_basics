import React, { Component, Fragment } from 'react';

export default class SlideItem  extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { content } = this.props;
    const itemWidth = `${100/content.length}%`;

    const items = content.map((item, index) => {
      return (
        <li
          style={{width: itemWidth}}
          key={index}
        >
        <img 
          style={{width: '100%'}}
          src="item"
        />
        <span>{index}</span>
        </li>
      )
    })
    return items;
  }

}
