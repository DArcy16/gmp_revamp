/** @format */

import React from "react";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const SliderButton = ({
	previous,
	next,
}) => {
	return (
		<div className="flex items-center gap-2 absolute -top-10 right-2">
			<button
				className="text-primary disabled:text-primary/50"
				onClick={previous}
				// disabled={currentSlide ? currentSlide <= 1 : false}
			>
				<FaAngleLeft />
			</button>
			<button
				className="text-primary disabled:text-primary/50"
				onClick={next}
				// disabled={
				// 	currentSlide
				// 		? currentSlide >=
				// 		  sliderRef?.current?.props?.children?.length -
				// 				sliderRef?.current?.props?.slidesToShow - 1
				// 		: false
				// }
			>
				<FaAngleRight />
			</button>
		</div>
	);
};

export default SliderButton;
