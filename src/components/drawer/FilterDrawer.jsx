/** @format */

import { Drawer } from "antd";
import React from "react";
import ProductFilter from "../products/ProductFilter";

const FilterDrawer = ({
	setFilter,
	filter,
	openFilterDrawer,
	setOpenFilterDrawer,
}) => {
	return (
		<Drawer
			title=""
			className="pb-0"
			onClose={() => setOpenFilterDrawer(false)}
			open={openFilterDrawer}
		>
			<ProductFilter
				filter={filter}
				setFilter={setFilter}
				setOpenFilterDrawer={setOpenFilterDrawer}
			/>
		</Drawer>
	);
};

export default FilterDrawer;
