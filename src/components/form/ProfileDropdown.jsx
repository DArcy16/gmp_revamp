/** @format */

import { Avatar, Dropdown } from "antd";
import React, { useEffect } from "react";
import { BiSolidConversation } from "react-icons/bi";
import { FaFileInvoice } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDownloadCloudFill } from "react-icons/ri";
import { TbPower } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth";
import { fetchUserInfo } from "../../redux/features/userInfo";

const ProfileDropdown = () => {
	const auth = useSelector((state) => state.auth.auth);
	const userInfo = useSelector(state => state.userInfo)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onLogout = () => {
		dispatch(logout(navigate));
	};

	useEffect(() => {
		if (auth.token) {
			dispatch(fetchUserInfo(auth));
		}
	}, [auth.token]);

	const items = [
		{
			label: (
				<Link to="/div" className="flex gap-3 items-center font-medium py-2">
					{" "}
					<MdSpaceDashboard className="text-xl" />
					Dashboard{" "}
				</Link>
			),
			key: "0",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Link to="/div" className="flex gap-3 items-center font-medium py-2">
					{" "}
					<FaFileInvoice className="text-xl" />
					Purchase History{" "}
				</Link>
			),
			key: "1",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Link to="/div" className="flex gap-3 items-center font-medium py-2">
					{" "}
					<RiDownloadCloudFill className="text-xl" />
					Downloads{" "}
				</Link>
			),
			key: "2",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Link to="/div" className="flex gap-3 items-center font-medium py-2">
					{" "}
					<BiSolidConversation className="text-xl" />
					Conversations{" "}
				</Link>
			),
			key: "3",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Link to="/div" className="flex gap-3 items-center font-medium py-2">
					{" "}
					<GiWallet className="text-xl" />
					My Wallet{" "}
				</Link>
			),
			key: "4",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Link to="/div" className="flex gap-3 items-center font-medium py-2">
					{" "}
					<FaCircleQuestion className="text-xl" />
					Support Ticket{" "}
				</Link>
			),
			key: "5",
		},
		{
			type: "divider",
		},
		{
			label: (
				<button
					onClick={onLogout}
					className="flex items-center gap-2 justify-center font-medium w-full h-full text-primary hover:text-white"
				>
					<TbPower className="text-xl" /> Logout
				</button>
			),
			key: "6",
		},
	];
	return (
		<Dropdown
			className="w-48"
			menu={{ items }}
			placement="bottomRight"
			arrow={{
				pointAtCenter: true,
			}}
		>
			<div className="hidden xl:flex group items-center gap-4 cursor-pointer">
				<Avatar
					className="outline group-hover:outline-2 group-hover:outline-primary transition-all duration-300"
					src={userInfo?.data?.avatar || "/img/placeholder.jpeg"}
				/>
				<p className="text-sm text-gray-700 font-medium"> {userInfo?.data?.name || "guest29383"}</p>
			</div>
		</Dropdown>
	);
};

export default ProfileDropdown;
