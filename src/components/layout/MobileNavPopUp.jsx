/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Icons
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";
import { BiCategory } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/features/userInfo";

const MobileNavPopUp = () => {
	const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.auth);
	const userInfo = useSelector(state => state.userInfo)

	useEffect(() => {
		if (auth.token) {
			dispatch(fetchUserInfo(auth));
		}
	},[dispatch, auth])

	return (
		<div className="fixed w-screen  xl:hidden flex bottom-0 sm:bottom-4 z-10 justify-center">
			<div className="w-full sm:w-fit ">
				<ul className="flex backdrop-blur-xl justify-evenly sm:justify-center sm:gap-3 bg-black/50 py-1 sm:rounded-full sm:py-2 sm:px-4">
					<li>
						<Link
							className="flex flex-col items-center text-xs gap-1 sm:px-3 sm:rounded-2xl text-gray-400 hover:text-primary py-2 font-medium "
							to="/div"
						>
							<HiOutlineHome className="text-lg sm:text-2xl" />
							Home
						</Link>
					</li>
					<li>
						<Link
							className="flex flex-col items-center text-xs gap-1 sm:px-3 sm:rounded-2xl text-gray-400 hover:text-primary py-2 font-medium "
							to="/div"
						>
							<BiCategory className="text-lg sm:text-2xl" />
							Categories
						</Link>
					</li>
					<li>
						<Link
							className="flex flex-col items-center text-xs gap-1 sm:px-3 sm:rounded-2xl text-gray-400 hover:text-primary py-2 font-medium "
							to="/div"
						>
							<BsCart2 className="text-lg sm:text-2xl" />
							Cart (0)
						</Link>
					</li>
					<li>
						<Link
							className="flex flex-col items-center text-xs gap-1 sm:px-3 sm:rounded-2xl text-gray-400 hover:text-primary py-2 font-medium "
							to="/div"
						>
							<IoMdNotificationsOutline className=" text-lg sm:text-2xl" />
							Notification
						</Link>
					</li>
					<li>
						{" "}
						<Link
							className="flex group flex-col items-center text-xs gap-1 sm:px-3 sm:rounded-2xl text-gray-400 hover:text-primary py-2 font-medium "
							to="/div"
						>
							{auth.token ? (
								<Avatar
									className="outline group-hover:outline-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:outline-primary transition-all duration-300"
									src={userInfo?.data?.avatar || "/img/placeholder.jpeg"}
								/>
							) : (
								<IoPersonOutline className="text-lg sm:text-2xl" />
							)}
							My Account
						</Link>{" "}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MobileNavPopUp;
