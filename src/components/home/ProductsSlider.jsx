/** @format */

import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// utils
import getArray from "../../utils/getArray";

// ICONS
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import ProductCard from "../_common/ProductCard";
import ProductCardSkeleton from "../_common/ProductCardSkeleton";

const ProductsSlider = ({ products = [], loading, link = "", isPage = false }) => {
	// const [currentSlide, setCurrentSlide] = useState(0);
	const sliderRef = useRef(null);

	const next = () => {
		sliderRef.current.slickNext();
	};

	const previous = () => {
		sliderRef.current.slickPrev();
	};

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: isPage ?  4 : 6,
		slidesToScroll: 1,
		prevArrow: <></>, // Custom arrow component to hide the previous button
		nextArrow: <></>,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		// afterChange: (current) => setCurrentSlide(current),
	};

	return (
		<div className="relative">
			<Slider ref={sliderRef} {...sliderSettings}>
				{!loading && products?.length > 0
					? products?.map((item) => (
							<ProductCard key={item?.id} product={item} />
					  ))
					: getArray(7).map((id) => <ProductCardSkeleton key={id} />)}
			</Slider>

			{/* Slider Prev Next Button */}
			<div className="flex items-center absolute -top-10 right-2">
				<button
					className="text-primary disabled:text-primary/50"
					onClick={previous}
					// disabled={currentSlide <= 0}
				>
					<FaAngleLeft />
				</button>

				<Link
					className="text-xs hover:text-primary transition-all duration-300 mx-3 font-medium"
					to={link}
				>
					{!isPage && "View All"}
				</Link>

				<button
					className="text-primary disabled:text-primary/50"
					onClick={next}
					// disabled={
					// 	currentSlide >=
					// 	sliderRef?.current?.props?.children?.length -
					// 		sliderRef?.current?.props?.slidesToShow
					// }
				>
					<FaAngleRight />
				</button>
			</div>
		</div>
	);
};

export default ProductsSlider;
