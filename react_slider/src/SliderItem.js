import React from 'react';
import { CSSTransition } from 'react-transition-group';

const SliderItem = (props) =>  {
	const { list, width, height, current } = props;
	return (
			list.map((item, index) => {
				return (
						<CSSTransition key={`${item}-${index}`} timeout={500}>
							<li
								className={`SliderItem ${current === index ? 'show' : 'hide'}`}
								style={{width: width + 'rem', height: height + 'rem'}}
								onTouchMove={touchMove}
							>
								<img style={{width: `${width}rem`, height: `${height}rem`}} src={item} alt={item} />
								<span>{index}</span>
							</li>
						</CSSTransition>
				)
			})
	)
}
function touchMove(e) {
	console.log('touched');

}
export default SliderItem;
