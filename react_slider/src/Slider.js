import React from 'react';
import SliderItem from './SliderItem';

class Slider extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      count: this.props.count
    }
	}
	render() {
    const { list, count, speed, autoplay, defaultIndex, width, height } = this.props;
		const current = this.state.currentIndex;
		const offset = current * width;
		const totalWidth = width * count;
		return (
			<div className="wapper">
				<ul
					className='imgContent'
					style={this.styleRender(offset,totalWidth, height)}
        >
					<SliderItem
						list={list}
						width={width}
						height={height}
					/>
				</ul>
			</div>
		)
	}
	styleRender(offset, totalWidth, height) {
		return {
			transform: `translate(-${offset}rem, 0)`,
			width: `${totalWidth}rem`,
			height: `${height}rem`
		}
	}
	componentDidMount() {
		this.flag = setInterval(() => {
        this.turn(1);
    }, 3000)
	}
	turn(n) {
		let current = this.state.currentIndex + n;
		let count = this.state.count;
    if(current < 0) {
      current = current + count;
    }
    if(current >= count) {
			current = current - count;
    }
    this.setState(() => {
			return {
				currentIndex: current
			}
    })
	}
}
Slider.flag = null;

export default Slider;
