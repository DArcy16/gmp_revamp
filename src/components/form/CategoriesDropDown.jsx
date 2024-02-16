/** @format */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Icons
import { FaChevronRight } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API } from "../../hooks/useFetch";
import getArray from "../../utils/getArray";

export const CategorySideBar = ({
	showCategories = false,
	isHomePage = false,
}) => {
	const [showSubCat, setShowSubCat] = useState(false);
	const [selectedMainCat, setSelectedMainCat] = useState(null);
	const [subCats, setSubCats] = useState([]);

	const { response: categories, loading: categoriesLoading } =
		useFetch("categories");

	useEffect(() => {
		if (selectedMainCat) {
			const abortController = new AbortController();
			const signal = abortController.signal;

			fetch(`${API}sub-categories-nested/${selectedMainCat}`, {
				methode: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (!signal.aborted) {
						setSubCats(data.data);
					}
				})
				.catch((error) => console.warn("Uh-oh.", error));

			return () => abortController.abort();
		}
	}, [selectedMainCat]);

	const RenderCategorySkeleton = () => {
		return (
			<li className="h-12 flex  border-t border-t-gray-200 px-5">
				<div className="flex gap-3 items-center">
					<div className="w-5 h-5 rounded-full animate-pulse bg-gray-200"></div>
					<div className="w-28 h-5 bg-gray-200 animate-pulse"></div>
				</div>
			</li>
		);
	}

	const RenderCategory = ({
		img = "/img/gmp_logo.png",
		name = "Fashion",
		id,
	}) => {
		return (
			<li
				className={`h-12 group ${
					id === selectedMainCat
						? "bg-hov-primary border-t border-t-white text-white"
						: "bg-white"
				}    cursor-pointer flex items-center hover:bg-hov-primary hover:text-white hover:border-t hover:border-t-white justify-between px-4`}
				onMouseEnter={() => {
					setSelectedMainCat(id);
					setShowSubCat(true);
				}}
			>
				<div className="flex gap-3 items-center">
					<img className="w-5 h-5 rounded-full" src={img} alt={name} />
					<span className="group-hover:translate-x-1 text-sm transition-all duration-500">
						{name}
					</span>
				</div>
				<FaChevronRight
					className={` text-sm ${
						id === selectedMainCat ? "text-white" : "text-gray-400"
					} group-hover:text-white`}
				/>
			</li>
		);
	};

	const RenderSubCategory = ({ title = "", items = [] }) => {
		return (
			<div className=" w-52 min-w-fit inline-block">
				<p className="cursor-pointer mb-2 text-sm font-bold hover:text-primary">
					{title}
				</p>
				<ul>
					{items.length > 0 &&
						items?.map((item, index) => (
							<li
								key={index}
								className="cursor-pointer text-sm mt-2 hover-animate-outline-primary"
							>
								{item?.name}
							</li>
						))}
				</ul>
			</div>
		);
	};

	return (
		<div
			className={`absolute w-[80vw] ${
				isHomePage
					? ""
					: ` ${
							showCategories ? "h-fit" : "h-0 hidden"
					  } transition-all duration-[3000ms]`
			}`}
		>
			{/* Main Cats */}
			<motion.ul
			 	initial={{opacity: 0, scale: 0.95}}
				animate={{opacity: 1, scale: 1}}
				transition={{duration: 1}}
				className={`w-72 bg-white text-black divide-y divide-y-gray-300 ${
					categoriesLoading
						? " "
						: "border-b border-b-gray-300 border-r border-r-gray-300"
				} `}
			>
				{categoriesLoading ? (
					getArray(11).map(item => <RenderCategorySkeleton key={item} />)
				) : (
					categories?.data?.map(
						(item, index) =>
							index <= 10 && (
								<RenderCategory
									key={item.id}
									name={item?.name}
									img={item?.icon}
									id={item?.id}
								/>
							)
					)
				)}
			</motion.ul>

			{/* Sub Cats */}
			{subCats.length > 0 && (
				<div
					onMouseLeave={() => {
						setSelectedMainCat(null);
						setShowSubCat(false);
					}}
					className={`absolute z-10 ${
						showSubCat ? "block w-fit" : "hidden w-0"
					} top-0 max-w-[60vw] transition-all max-h-[529px] overflow-y-auto scroll-bar-light  duration-300 p-10 flex flex-wrap gap-10 left-72 bg-gray-50/90 rounded-br-lg`}
				>
					{/* Sub cats */}
					{subCats?.map((item) => (
						<RenderSubCategory
							key={item?.name}
							title={item?.name}
							items={item?.childCategories.data}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const CategoriesDropDown = () => {
	const location = useLocation();
	const isHomePage = location.pathname.split("/")[1] === "";
	const [showCategories, setShowCategories] = useState(false);

	return (
		<div>
			<div
				onClick={() => (isHomePage ? "" : setShowCategories((prev) => !prev))}
				className="hidden relative xl:block w-72 py-3 bg-hov-primary text-white font-bold text-center"
			>
				Categories
			</div>
			{isHomePage ? "" : <CategorySideBar showCategories={showCategories} />}
		</div>
	);
};

export default CategoriesDropDown;
