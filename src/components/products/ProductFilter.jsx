/** @format */

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "antd";

import FilterCollapse from "./FilterCollapse";
import { Refresh } from "../Refresh";

import getArray from "../../utils/getArray";

const sizeOptions = [
	{
		value: "sm",
		label: "S",
	},
	{
		value: "md",
		label: "M",
	},
	{
		value: "lg",
		label: "L",
	},
	{
		value: "xl",
		label: "XL",
	},
	{
		value: "2xl",
		label: "2XL",
	},
	{
		value: "3xl",
		label: "3XL",
	},
];

const designOptions = [
	...getArray(6).map((id) => ({
		value: `design-${id}`,
		label: `Design - ${id}`,
	})),
];

const footSizeOptions = [
	...getArray(20).map((id) => ({
		value: `${parseInt(id) + 30}`,
		label: `${parseInt(id) + 30}`,
	})),
];

const ProductFilter = ({ setFilter, filter, setOpenFilterDrawer = "" }) => {
	const onSearchBtnClick = () => {
		setOpenFilterDrawer(false);
	};
	
	return (
		<div className="space-y-4 p-1">
			<h2 className="text-xl font-semibold">Filter</h2>

			<FilterCollapse
				filter={filter}
				setFilter={setFilter}
				name={"Size"}
				options={sizeOptions}
			/>

			<FilterCollapse
				filter={filter}
				setFilter={setFilter}
				name={"Design"}
				options={designOptions}
			/>

			<FilterCollapse
				filter={filter}
				setFilter={setFilter}
				name="Foot Size"
				options={footSizeOptions}
			/>

			<div className="border rounded-lg py-2 px-4 border-black/15">
				<h3 className="font-medium">Price Range</h3>
				<Slider range defaultValue={[100, 300000]} min={100} max={300000} />
				<p className="text-xs font-medium">
					<span>100</span>
					<span className=" float-right">300,000</span>
				</p>
			</div>

			{/* Selected */}
			{(filter?.size?.length > 0 ||
				filter["foot-size"]?.length > 0 ||
				filter?.design?.length > 0) && (
				<motion.div layout className="border rounded-lg py-2 px-4 border-black/15">
					<div className="flex justify-between items-center">
						<h3 className="font-medium">Selected</h3>
						<Refresh
							onClick={() =>
								setFilter({
									size: [],
									"foot-size": [],
									design: [],
								})
							}
						/>
					</div>
					<div className="text-sm font-medium">
						{filter?.size?.length > 0 && (
							<p className="mt-2">
								{" "}
								Size : <span className="captitalize">{filter?.size?.join(", ")}</span>{" "}
							</p>
						)}
						{filter["foot-size"]?.length > 0 && (
							<p className="mt-2">
								{" "}
								Foot Size : <span className="captitalize">{filter["foot-size"]?.join(", ")}</span>{" "}
							</p>
						)}
						{filter?.design?.length > 0 && (
							<p className="mt-2">
								{" "}
								Design : <span className="captitalize">{filter?.design?.join(", ")}</span>{" "}
							</p>
						)}
					</div>
				</motion.div>
			)}

			<div className="flex justify-center">
				<button
					onClick={onSearchBtnClick}
					className="w-full py-2 font-medium bg-primary text-white hover:bg-secondary active:scale-95 transition-all"
				>
					Search
				</button>
			</div>
		</div>
	);
};

export default ProductFilter;
