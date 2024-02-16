/** @format */

import React, { useState } from "react";


// Components
import PageHeading from "../components/_common/PageHeading";
import MainCategoriesSlider from "../components/categories/MainCategoriesSlider";
import SubCategories from "../components/categories/SubCategories";

const pagi = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "/",
	},
	{
		name: '"All Categories"',
		active: "true",
	},
];


const Categories = () => {
	const [selectedMainCategory, setSelectedMainCategory] = useState(297);

	return (
		<div className=" min-h-screen pb-16">
			<div className="section_padding">
				<PageHeading name="Categories" pagi={pagi} />
			</div>

			<div className="section_padding">
				<MainCategoriesSlider
					selectedMainCategory={selectedMainCategory}
					setSelectedMainCategory={setSelectedMainCategory}
				/>
			</div>

			<div className="section_padding">
				<SubCategories selectedMainCategory={selectedMainCategory}/>
			</div>
		</div>
	);
};

export default Categories;
