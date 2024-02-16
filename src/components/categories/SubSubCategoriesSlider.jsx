/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";

// Utils
import getArray, { getId } from "../../utils/getArray";
import { slugify } from "../../utils/slugify";

const SubSubCategoriesSlider = ({ subSubCategories, skeleton = false }) => {
	const sliderSettings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 1,
		swipeToSlide: true,
		autoplay: false,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		// variableWidth: true,
		prevArrow: <></>, // Custom arrow component to hide the previous button
		nextArrow: <></>,

		// afterChange: (current) => setCurrentSlide(current),
	};

	const SubCategoryCard = ({ data }) => {
		return (
			<Link
				to={`${slugify(data?.name)}?id=${getId(data.links.products)}`}
				className="min-h-24 flex items-center w-[90%] text-center mx-auto py-[.2rem] text-black/60 px-4 cursor-pointer mr-2 rounded-lg border border-black/15 hover:text-primary hover:border-primary"
			>
				<p className="break-words w-full">{data?.name}</p>
			</Link>
		);
	};

	const SkeletonCard = () => {
		return (
			<div className="py-[.2rem] min-h-24 flex items-center w-[90%] px-4 rounded-lg border border-black/15">
				<div className=" h-16 w-[80%] rounded-md  mx-auto animate-pulse bg-gray-200"></div>
			</div>
		);
	};

	return (
		<Slider {...sliderSettings}>
			{skeleton
				? getArray(9).map((item) => <SkeletonCard key={item} />)
				: subSubCategories?.map((item, index) => (
						<SubCategoryCard key={index} data={item} />
				  ))}
		</Slider>
	);
};

export default SubSubCategoriesSlider;
