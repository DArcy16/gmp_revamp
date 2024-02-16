/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";

// Components
import BannerSlider from "../components/home/BannerSlider";
import TodayDeal from "../components/home/TodayDeal";
import ShowProduct from "../components/home/ShowProduct";
import SmallBanner from "../components/home/SmallBanner";
import LargeBanner from "../components/home/LargeBanner";
import PointShop from "../components/home/PointShop";
import PageChangeMotion from "../components/_common/PageChangeMotion";
import ProgressMotion from "../components/_common/ProgressMotion";

// Icons
import { RiCoupon5Line } from "react-icons/ri";
import { Refresh } from "../components/Refresh";

const Home = () => {

	return (
		<>
			<BannerSlider />

			<TodayDeal />

			<ShowProduct
				title="Featured Products"
				url="products/featured"
				link="/products?type=featured"
			/>

			<SmallBanner url="banners-one" />

			<ShowProduct
				title="Just For You"
				url="products/recommend"
				link="/products?type=recommend"
			/>

			<ShowProduct
				title="Discount Product"
				url="products/discounted"
				link="/products?type=discounted"
			/>

			<div className="section_padding">
				<LargeBanner />
			</div>

			<ShowProduct
				title="Best Selling"
				url="products/best-seller"
				link="/products?type=best-seller"
			/>

			<ShowProduct
				title="New Products"
				url="products/newest"
				link="/products?type=newest"
			/>

			<SmallBanner url="banners-three" />

			{/* Coupons */}
			<section className="bg-grayish mt-12">
				<div className="flex  inset_padding justify-between items-center">
					<RiCoupon5Line className="transform rotate-[30deg] text-7xl text-white" />
					<Link
						to=""
						className="block px-4 py-2 bg-white/40 rounded-md text-white font-medium ring-2 ring-white hover:bg-white hover:text-black transition-all"
					>
						View All Coupons
					</Link>
				</div>
			</section>

			<PointShop />

			<Refresh />

			
		</>
	);
};

export default Home;
