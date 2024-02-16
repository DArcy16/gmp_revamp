/** @format */

import React from "react";
import { motion } from "framer-motion";

import PageHeading from "../components/_common/PageHeading";
import BrandCard, { BrandCardSkeleton } from "../components/brands/BrandCard";

// Utils
import useFetch from "../hooks/useFetch";
import getArray from "../utils/getArray";

const pagi = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "/",
	},
	{
		name: '"All Brands"',
		active: "true",
	},
];

const Brands = () => {
	const { response: brands, loading } = useFetch("brands");

	return (
		<div			
			className=" min-h-96"
		>
			<div className="section_padding">
				<PageHeading name="Brands" pagi={pagi} />
			</div>

			{/* Brand List */}
			<div className="flex flex-wrap section_padding pb-12">
				{loading
					? getArray(6).map((id) => (
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8 }}
								key={id}
								className="w-1/6"
							>
								<BrandCardSkeleton />
							</motion.div>
					  ))
					: brands?.data?.map((brand) => (
							<motion.div
								initial={{ opacity: .5, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 2 }}
								key={brand?.id}
								className="w-1/6"
							>
								<BrandCard brand={brand} />
							</motion.div>
					  ))}
			</div>
		</div>
	);
};

export default Brands;
