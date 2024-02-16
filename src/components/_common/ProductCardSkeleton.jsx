/** @format */

import React from "react";
import {motion} from "framer-motion"

const ProductCardSkeleton = ({ width = "full", isList = false }) => {
	return (
		<motion.article
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			className={`group flex pb-4 flex-col gap-2 ${
				isList ? " hover:shadow-2xl" : "hov-animate-outline"
			}  border border-black/10 hover:border-black/0 transition-all delay-200 duration-300`}
		>
			<div className="relative w-[90%] mx-auto h-56 overflow-hidden border-b border-b-black/10 pt-2">
				<img
					className="w-full h-full object-contain animate-pulse"
					src="/img/placeholder.jpeg"
					alt=""
				/>
			</div>
			<div className=" w-10/12 mx-auto px-4 h-8 mt-2 animation-pulse bg-gray-200"></div>
			<div className=" w-1/3 mx-auto h-6 mt-3 animation-pulse bg-gray-200"></div>
		</motion.article>
	);
};

export default ProductCardSkeleton;
