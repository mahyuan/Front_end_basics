import React from 'react';

const SliderItem = (props) =>  {
	const { list, width, height } = props;
	return (
		list.map((item, index) => {
			return (
				<li
					className='SliderItem'
					style={{width: width + 'rem', height: height + 'rem'}}
					key={`${item}-${index}`}
				>
					<img style={{width: `${width}rem`, height: `${height}rem`}} src={item} alt={item} />
					<span>{index}</span>
				</li>
			)
		})
	)
}
export default SliderItem;
