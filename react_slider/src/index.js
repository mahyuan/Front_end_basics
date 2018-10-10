import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './Slider';
import "./stylesheet/style.css";
import './assets/common';

const config = {
	speed: 1,
	delay: 2,
	autolpay: true,
	defaultIndex: 0,
	width: 7.5,
	height: 4.2,
	imgs: require('./assets/data.json')
}

ReactDOM.render(
	<Slider
		list={config.imgs}
		count={config.imgs.length}
		speed={config.speed}
		autoplay={config.autolpay}
		defaultIndex={config.defaultIndex}
		width={config.width}
		height={config.height}
		/>,
	document.getElementById('root')
);

