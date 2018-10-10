import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SliderItem = (props) =>  {
	const { list, width, height, current } = props;
	return (
		// <TransitionGroup>
			list.map((item, index) => {
				return (
						<CSSTransition key={`${item}-${index}`} timeout={500}>
							<li
								className={`SliderItem ${current === index ? 'show' : 'hide'}`}
								style={{width: width + 'rem', height: height + 'rem'}}

							>
								<img style={{width: `${width}rem`, height: `${height}rem`}} src={item} alt={item} />
								<span>{index}</span>
							</li>
						</CSSTransition>
				)
			})
		// </TransitionGroup>
	)
}
export default SliderItem;
