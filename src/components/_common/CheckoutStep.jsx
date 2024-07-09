/** @format */

import React from "react";

// logo
import { MdOutlineShoppingCart, MdPayment } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Tooltip } from "antd";

const steps = [
	{
		name: "My Cart",
		icon: <MdOutlineShoppingCart className="text-2xl md:text-3xl" />,
	},
	{
		name: "Shipping Info",
		icon: <FaRegAddressCard className="text-2xl md:text-3xl" />,
	},
	{
		name: "Delievery Info",
		icon: <LiaShippingFastSolid className="text-2xl md:text-3xl" />,
	},
	{
		name: "Payment",
		icon: <MdPayment className="text-2xl md:text-3xl" />,
	},
	{
		name: "Confirmation",
		icon: <IoMdCheckmarkCircleOutline className="text-2xl md:text-3xl" />,
	},
];

const CheckoutStep = ({ active = "cart" }) => {
	return (
		<div className="flex gap-2 lg:gap-4">
			{steps.map((item, index) => (
				<div key={item.name} className="w-1/5 border border-black/15">
					<Tooltip
						title={
							item.name
						}
					>
						<div
							className={`flex flex-col w-full py-5 justify-center items-center font-medium ${
								active === item.name ? "text-primary" : "text-gray-400"
							}`}
						>
							<div
								className={`${
									active === item.name && "active_step_animation"
								} w-fit`}
							>
								{item.icon}
							</div>
							<h3 className="capitalize mt-2 hidden text-sm md:block">
								{index + 1}. {item.name}
							</h3>
						</div>
					</Tooltip>
					<div
						className={`h-1 bg-gray-300 ${
							active === item.name ? "bg-primary" : "bg-gray-300"
						}`}
					></div>
				</div>
			))}
		</div>
	);
};

export default CheckoutStep;
