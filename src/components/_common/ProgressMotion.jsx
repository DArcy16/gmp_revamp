/** @format */

import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

const ProgressMotion = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return <motion.div className="progress" style={{ scaleX }} />;
};

export default ProgressMotion;
