/** @format */

import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// Utils
import getArray from "../../utils/getArray";
import BannerSkeleton from "../BannerSkeleton";
import useFetch from "../../hooks/useFetch";

const SmallBanner = ({url}) => {
	const {response: bannerImages, loading} = useFetch(url);

	const sliderSettings = {
		className: "center",
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: <></>, // Custom arrow component to hide the previous button
		nextArrow: <></>,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
	};


	return (
		<div className="section_padding">
			<Slider {...sliderSettings}>
				{!loading
					? bannerImages?.data?.map((item) => (
							<div key={item}>
								<Link className="block rounded-md w-[98%] mx-auto overflow-hidden h-auto">
									<img
										className="w-full hover:scale-105 transition-all duration-300"
										src={item?.photo}
										alt="bannerImg"
									/>
								</Link>
							</div>
					  ))
					: getArray(3).map((item) => (
							<div key={item}>
								<div className="block rounded-md w-[98%] h-24 md:h-56 mx-auto overflow-hidden">
									<BannerSkeleton/>
								</div>
							</div>
					  ))}
			</Slider>
		</div>
	);
};

export default SmallBanner;
