/** @format */

import React from "react";
import { CategorySideBar } from "../form/CategoriesDropDown";
import { Carousel } from "antd";
import useFetch from "../../hooks/useFetch";

const BannerSlider = () => {

	const contentStyle = {
		height: "529px",
		color: "#fff",
		lineHeight: "160px",
		textAlign: "center",
		background: "#364d79",
	};

	return (
		<div className="flex">
			<div className="hidden xl:block w-72 h-[529px]">
				<CategorySideBar isHomePage={true} />
			</div>
			
			<div className="w-full xl:w-[calc(100%-18rem)] max-h-[529px] overflow-hidden">
				<Carousel autoplay autoplaySpeed={1500}>
					<div className="xl:h-[529px]" style={contentStyle}>
						<img
							className="w-full h-full object-cover object-bottom"
							src="/img/homeslide.jpg"
							alt="img1"
						/>
					</div>
					<div className="xl:h-[529px] " style={contentStyle}>
						<img
							className="w-full h-full object-cover object-bottom"
							src="/img/homeslide1.jpg"
							alt="img1"
						/>
					</div>
					<div className="xl:h-[529px]" style={contentStyle}>
						<img
							className="w-full h-full object-cover object-bottom"
							src="/img/homeslide2.jpg"
							alt="img1"
						/>
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default BannerSlider;
