/** @format */

import React, { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import Slider from "react-slick";
import { motion } from "framer-motion";

// Components
import SliderButton from "../_common/SliderButton";
import getArray from "../../utils/getArray";

const MainCategoriesSlider = ({
	selectedMainCategory,
	setSelectedMainCategory,
}) => {
	const { response : mainCategories, loading: mainCategoriesLoading } =
		useFetch("categories");
	const sliderRef = useRef(null);

	// Go To Selected Category
	useEffect(() => {
		if (sliderRef.current && selectedMainCategory) {
			const selectedElement = document.getElementsByClassName(
				`id-${selectedMainCategory}`
			);
			if (selectedElement) {
				const slideIndex = Array.from(
					sliderRef.current.innerSlider.list.querySelectorAll(".slick-slide")
				).findIndex((slide) => slide.contains(selectedElement[0]));
				if (slideIndex !== -1) {
					sliderRef.current.slickGoTo(slideIndex);
				}
			}
		}
	}, [sliderRef, selectedMainCategory]);

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
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: <></>, // Custom arrow component to hide the previous button
		nextArrow: <></>,
		swipeToSlide: true,
		autoplay: false,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		variableWidth: true,

		
		// afterChange: (current) => setCurrentSlide(current),
	};

	const MainCategoryCard = ({ data }) => {
		const isSelected =
			data.id === selectedMainCategory
				? "border-primary text-primary"
				: "border-black/10 text-black/60";
		return (
			<motion.div
				onClick={() => setSelectedMainCategory(data?.id)}
				// initial={{ opacity: 0, scale: 0.9 }}
				// animate={{ opacity: 1, scale: 1 }}
				// transition={{ duration: 0.1 }}
				className={`id-${data?.id} flex min-w-fit mr-2 rounded-lg hover:text-primary/60 hover:border-primary/60 ${isSelected} items-center gap-2 border py-1 px-4 cursor-pointer`}
			>
				<div className="w-6 h-6">
					<img className="w-full h-full rounded-full" src={data?.icon} alt="" />
				</div>
				<p>{data?.name}</p>
			</motion.div>
		);
	};

	const Skeleton = () => {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8 }}
				className="flex w-[90%] rounded-lg mx-auto items-center gap-2 border py-1 px-4 border-black/10"
			>
				<div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
				<div className="w-32 rounded-md  h-6 bg-gray-200 animate-pulse"></div>
			</motion.div>
		);
	};

	return (
		<div className="relative mt-4">
			<Slider ref={sliderRef} {...sliderSettings}>
				{mainCategoriesLoading
					? getArray(8).map((item) => <Skeleton key={item} />)
					: mainCategories?.data?.map((item) => (
							<MainCategoryCard key={item?.id} data={item} />
					  ))}
			</Slider>

			<SliderButton previous={previous} next={next} />
		</div>
	);
};

export default MainCategoriesSlider;
