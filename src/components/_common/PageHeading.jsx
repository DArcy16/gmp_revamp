/** @format */

import React from "react";
import BreadCrump from "./BreadCrump";

const PageHeading = ({ name = "", pagi = [] }) => {
	return (
		<div className="flex items-center justify-between">
			<h2 className="section_heading">{name}</h2>
			<BreadCrump pagi={pagi}/>
		</div>
	);
};

export default PageHeading;
