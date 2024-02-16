/** @format */

import React from "react";
import Slider from "react-slick";

import { Link } from "react-router-dom";
import getArray from "../../utils/getArray";
import LargeBanner from "./LargeBanner";
import useFetch from "../../hooks/useFetch";
import { slugify } from "../../utils/slugify";



const TodayDeal = () => {
	const { response: todayDeals, loading } = useFetch("products/todays-deal");

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
	};


	const RenderProduct = ({product}) => {
		return (
			<div className="flex justify-center">
				<Link to={`products/${slugify(product?.name)}?id=${product?.id}`}>
					<div className=" w-24 h-24 rounded-full overflow-hidden">
						<img
							className="w-full h-full hover:scale-105 transition-all duration-300"
							src={product?.thumbnail_image}
							alt="placeholder"
						/>
					</div>
				</Link>
			</div>
		);
	};

	const ProductSkeleton = () => {
		return (
			<div className="flex justify-center">
				<img
					className="w-20 h-20 rounded-full animate-pulse"
					src="/img/placeholder.jpeg"
					alt="placeholder"
				/>
			</div>
		);
	};



	return (
		<section className="section_padding">
			{/* Banner Imager */}
			<LargeBanner path="/today-deals" />
			<div className="relative bg-[#222]  px-20 py-16">
				<Slider {...sliderSettings}>
					{loading
						? getArray(6).map((id) => <ProductSkeleton key={id} />)
						: todayDeals?.data?.map((item) => (
								<RenderProduct
									product={item}
									key={item.id}
								/>
						  ))}
				</Slider>
				<Link
					to={"/today-deals"}
					className="absolute text-xs font-medium right-5 top-2 text-white hover:text-primary transition-all duration-300"
				>
					View All
				</Link>
			</div>
		</section>
	);
};

export default TodayDeal;
