/** @format */

import React from "react";
import { motion } from "framer-motion";

// Utils
import getArray from "../../utils/getArray";

// Components
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";
import NothingHere from "./NothingHere";

const ProductList = ({
	loading = true,
	products = [],
	isProductPage = false,
}) => {
	return (
		<>
			{loading ? (
				<div className="flex flex-wrap">
					{getArray(12).map((id) => (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className={`${
								isProductPage
									? "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/4"
									: "w-1/6"
							}`}
							key={id}
						>
							<ProductCardSkeleton isList={isProductPage} />
						</motion.div>
					))}
				</div>
			) : products?.length > 0 ? (
				<div className="flex flex-wrap">
					{products.map((item) => (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className={`${
								isProductPage
									? "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/3 xl:w-1/4"
									: "w-1/6"
							}`}
							key={item.id}
						>
							<ProductCard product={item} isList={isProductPage} />
						</motion.div>
					))}
				</div>
			) : (
				<NothingHere label="There is no product, yet." width="w-2/3 md:w-1/2" />
			)}
		</>
	);
};

export default ProductList;
