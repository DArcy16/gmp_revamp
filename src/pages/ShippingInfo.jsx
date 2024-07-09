/** @format */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

import { CiEdit } from "react-icons/ci";
import { FaAnglesLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";


import CheckoutStep from "../components/_common/CheckoutStep";

import {
	addCartAddress,
	addressActions,
	deleteAddress,
	fetchAddress,
} from "../redux/features/address";
import EditAddressModal from "../components/drawer/EditAddressModal";
import AddAddressModal from "../components/drawer/AddAddressModal";

const ShippingInfo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const auth = useSelector((state) => state.auth.auth);
	const address = useSelector((state) => state.address);

	const [editId, setEditId] = useState("");
	const [cartAddress, setCartAddress] = useState();
	const [editAddressModal, setEditAddressModal] = useState(false);
	const [newAddressModal, setNewAddressModal] = useState(false);

	useEffect(() => {
		if (auth?.token) {
			dispatch(fetchAddress(auth.token));
		}
	}, [dispatch]);


	return (
		<div className="max-w-[1100px] mx-auto section_padding responsive_pb">
			<CheckoutStep active="Shipping Info" />

			<div className="mt-4 px-6 py-6 md:mt-6 border border-black/15">
				{address.status === "loading" && (
					<div className="h-[20vh] flex items-center justify-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="mt-8 flex h-96 items-center justify-center"
						>
							<Spin size="large" />
						</motion.div>
					</div>
				)}

				{address.status === "succeeded" && (
					<div className="space-y-4">
						<AnimatePresence>
							{typeof address?.data !== "string" &&
								address?.data?.map((item) => (
									<motion.div
										exit={{ opacity: 0, x: -100 }}
										transition={{ duration: 0.5 }}
										key={item.id}
										className="custom_radio"
									>
										<input
											name="address"
											value={item.id}
											onChange={(e) =>
												e.target.checked && setCartAddress(item.id)
											}
											type="radio"
											// checked={item.id === cartAddress}
										/>
										<div className="px-6 py-4 font-medium space-y-3 text-black/50 text-sm">
											<p className="text-sm md:text-base w-[90%] flex ">
												<span className="w-24 md:w-32 shrink-0 block">No / Street</span>
												<span className="text-black/70">{item.address}</span>
											</p>
											<p className="text-sm md:text-base w-[90%] flex ">
												<span className="w-24 md:w-32 block">Postal Code</span>
												<span className="text-black/70">
													{item.postal_code}
												</span>
											</p>
											<p className="text-sm md:text-base w-[90%] flex ">
												<span className="w-24 md:w-32 block">Country</span>
												<span className="text-black/70">
													{item.country_name}
												</span>
											</p>
											<p className="text-sm md:text-base w-[90%] flex ">
												<span className="w-24 md:w-32 block">State</span>
												<span className="text-black/70">{item.state_name}</span>
											</p>
											<p className="text-sm md:text-base w-[90%] flex ">
												<span className="w-24 md:w-32 block">City</span>
												<span className="text-black/70">{item.city_name}</span>
											</p>
											<p className="text-sm md:text-base w-[90%] flex ">
												<span className="w-24 md:w-32 block">Phone</span>{" "}
												<span className="text-black/70">{item.phone} </span>
											</p>
										</div>
										<div className="absolute flex flex-col md:flex-row gap-2 bottom-4 right-4">
											<button
												onClick={() => {
													setEditId(item.id);
													setEditAddressModal(true);
												}}
												className="group block p-2 rounded-full bg-yellowish/20 hover:bg-primary transition"
											>
												<CiEdit className="text-lg text-primary group-hover:text-white transition" />{" "}
											</button>
											<button
												onClick={() => {
													dispatch(
														deleteAddress({ id: item.id, token: auth.token })
													);
												}}
												className="group block p-2 rounded-full bg-yellowish/20 hover:bg-primary transition"
											>
												{" "}
												<MdDeleteForever className="text-lg text-primary group-hover:text-white transition" />{" "}
											</button>
										</div>
									</motion.div>
								))}
						</AnimatePresence>
					</div>
				)}

				<button
					onClick={() => setNewAddressModal(true)}
					className="w-full flex text-sm md:text-base flex-col items-center justify-center mt-4 h-20 text-white bg-yellowish font-bold hover:bg-yellowish/90 transition"
				>
					<FaPlus />
					Add New Address
				</button>
				<div className="flex mt-6 justify-between">
					<Link
						to={"/cart"}
						className="flex items-center gap-1 md:gap-2 font-medium md:text-base text-primary hover:text-primary/90"
					>
						<FaAnglesLeft className=" text-xs" /> Previous
					</Link>
					<button
						onClick={() => {
							dispatch(addCartAddress({id: cartAddress, navigate, token: auth.token}));
						}}
						className="font-medium text-sm px-4 py-2 bg-primary text-white hover:bg-secondary transition "
					>
						Continute To Delievery
					</button>
				</div>
			</div>

			<EditAddressModal
				isOpen={editAddressModal}
				closeModal={() => setEditAddressModal(false)}
				id={editId}
			/>
			<AddAddressModal
				isOpen={newAddressModal}
				closeModal={() => setNewAddressModal(false)}
			/>
		</div>
	);
};

export default ShippingInfo;
