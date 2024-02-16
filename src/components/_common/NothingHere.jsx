/** @format */

import React from "react";
import { motion } from "framer-motion";

const NothingHere = ({ label, width }) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.8 }}
			className="w-full flex flex-col min-h-60 items-center justify-center space-y-4"
		>
			<img className={`${width}`} src="/img/nothing.svg" alt="nothing" />
			<p className="font-medium">{label}</p>
		</motion.div>
	);
};

export default NothingHere;
