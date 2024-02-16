/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { API } from "../../hooks/useFetch";

import SubSubCategoriesSlider from "./SubSubCategoriesSlider";
import { Spin } from "antd";
import { slugify } from "../../utils/slugify";
import { getId } from "../../utils/getArray";

const SubCategories = ({ selectedMainCategory }) => {
	const [subCategories, setSubCategories] = useState({
		data: [],
		loading: true,
	});

	useEffect(() => {
		if (selectedMainCategory) {
			const abortController = new AbortController();
			const signal = abortController.signal;
			setSubCategories((prev) => ({ ...prev, loading: true }));
			fetch(`${API}sub-categories-nested/${selectedMainCategory}`, {
				methode: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (!signal.aborted) {
						setSubCategories({ data: data.data, loading: false });
					}
				})
				.catch((error) => console.warn("Uh-oh.", error));

			return () => abortController.abort();
		}
	}, [selectedMainCategory]);

	return (
		<>
			{subCategories.loading ? (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="mt-8 flex h-80 items-center justify-center"
				>
					<Spin size="large" />
				</motion.div>
			) : (
				subCategories?.data?.map((item) => (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8 }}
						className="mt-8"
						key={item?.name}
					>
						<div className="group w-fit flex items-center gap-6">
							{/* <img
									className="w-16 h-16 rounded-full outline outline-2 outline-black/15 group-hover:outline-primary outline-offset-4"
									src="/img/placeholder.jpeg"
									alt=""
								/> */}
							<h3 className="font-medium hover:text-primary">
								<Link
									to={`${slugify(item?.name)}?id=${getId(
										item?.links?.products
									)}`}
								>
									{item.name}
								</Link>
							</h3>
						</div>
						<div className="mt-4">
							<SubSubCategoriesSlider
								subSubCategories={item?.childCategories?.data}
							/>
						</div>
					</motion.div>
				))
			)}
		</>
	);
};

export default SubCategories;
