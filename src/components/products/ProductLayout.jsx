/** @format */

import React, { useMemo, useState } from "react";

import ProductList from "../_common/ProductList";
import BreadCrump from "../_common/BreadCrump";
import useFetch from "../../hooks/useFetch";

// Icons
import { FaFilter } from "react-icons/fa6";
import { Pagination, Select } from "antd";
import ProductFilter from "./ProductFilter";
import FilterDrawer from "../drawer/FilterDrawer";

const ProductLayout = ({ title = "Name", url = "blah/blah", pagi }) => {
	const [filter, setFilter] = useState({
		size: [],
		"foot-size": [],
		design: [],
	});
	const [openFilterDrawer, setOpenFilterDrawer] = useState();
	const [page, setPage] = useState(1);
	const { response: products, loading } = useFetch(`${url}?page=${page}`);

	return (
		<>
			<div className="flex lg:space-x-10 relative">
				<div className="hidden lg:block lg:w-80 h-fit sticky top-52">
					<ProductFilter filter={filter} setFilter={setFilter} />
				</div>
				<div className="w-full lg:w-[calc(100%-20rem)] ">
					{/* Breadcrumbs */}
					<div className="flex justify-between">
						<BreadCrump pagi={pagi} />
						<button
							onClick={() => setOpenFilterDrawer(true)}
							className="lg:hidden"
						>
							<FaFilter className="text-black/70 hover:text-primary tranistion-all" />
						</button>
					</div>

					{/* Title And Sort */}
					<div className="mt-4 flex justify-between">
						<h2 className="section_heading capitalize">{title}</h2>

						<Select
							size="normal"
							className="font-medium"
							style={{ width: 160 }}
							defaultValue="1"
							options={[
								{
									value: "1",
									label: "Newest",
								},
								{
									value: "2",
									label: "Oldest",
								},
								{
									value: "3",
									label: "Price low to high",
								},
								{
									value: "4",
									label: "Price High To Low",
								},
							]}
						/>
					</div>

					{/* Product List */}
					<div className="mt-6">
						<ProductList
							loading={loading}
							products={products?.data}
							isProductPage={true}
						/>
					</div>

					{/* Pagination */}
						{title !== "Best Selling Products" && <div className="mt-4 flex justify-center">
							{/* Large Pagination */}
							<Pagination
								className="hidden sm:block"
								defaultCurrent={1}
								total={
									products?.meta?.total
										? products?.meta?.total
										: products?.meta?.total === 0
										? 0
										: 50
								}
								showTotal={(total, range) =>
									products?.meta?.total
										? `${range[0]}-${range[1]} of ${total}`
										: ""
								}
								onChange={(page) => setPage(page)}
								showSizeChanger={false}
								pageSize={products?.meta?.per_page || 10}
							/>

							{/* Small Pagination */}
							<Pagination
								className="sm:hidden block"
								size="small"
								defaultCurrent={1}
								total={
									products?.meta?.total
										? products?.meta?.total
										: products?.meta?.total === 0
										? 0
										: 50
								}
								showTotal={(total, range) =>
									products?.meta?.total
										? `${range[0]}-${range[1]} of ${total}`
										: ""
								}
								onChange={(page) => setPage(page)}
								showSizeChanger={false}
								pageSize={products?.meta?.per_page || 10}
							/>
						</div>}
				</div>
			</div>
			<FilterDrawer
				filter={filter}
				setFilter={setFilter}
				openFilterDrawer={openFilterDrawer}
				setOpenFilterDrawer={setOpenFilterDrawer}
			/>
		</>
	);
};

export default ProductLayout;
