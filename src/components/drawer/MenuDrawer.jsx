import { Avatar, Drawer } from 'antd';
import React, { useEffect } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../redux/features/userInfo';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth';

const MenuDrawer = ({setOpenMenu, openMenu}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector(state => state.auth.auth);
	const userInfo = useSelector(state => state.userInfo);

	useEffect(() => {
		if(auth.token) {
			dispatch(fetchUserInfo(auth));
		}
	}, [auth.token])
	
  return (
		<Drawer
			title="Menu"
			placement="left"
			onClose={() => setOpenMenu(false)}
			open={openMenu}
		>
			<div className="scroll-bar-light overflow-y-auto h-[94%]">
				{auth.token ? (
					<div className="flex gap-4 pl-2 py-3 items-center group cursor-pointer border-b border-b-gray-300">
						<Avatar
							className="outline group-hover:outline-2 group-hover:outline-primary transition-all duration-300"
							src={userInfo?.data?.avatar || "/img/placeholder.jpeg"}
						/>
						<p className="text-sm text-gray-700 font-medium">{userInfo?.data?.name || "guest303203"}</p>
					</div>
				) : (
					<div className="flex gap-4 text-gray-400 pl-2 py-3 items-center group cursor-pointer border-b border-b-gray-300">
						<IoPersonCircleOutline className="group-hover:text-primary font-light group-hover:drop-shadow-xl transition-all duration-300 text-[2.5rem]" />
						<Link to="/login" className=" text-sm hover:text-primary transition duration-300">
							{" "}
							Login
						</Link>
						|
						<Link to="/register" className="text-sm hover:text-primary transition duration-300">
							Register
						</Link>
					</div>
				)}
				<ul className="py-6 font-semibold border-b border-b-gray-300">
					<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
						{" "}
						Home{" "}
					</li>
					<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
						{" "}
						Flash Sale{" "}
					</li>
					<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
						{" "}
						Blogs
					</li>
					<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
						{" "}
						All Brands
					</li>
					<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
						{" "}
						All Categories
					</li>
					<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
						{" "}
						Points Shop
					</li>
				</ul>

				{auth.token ? (
					<>
						<ul className="py-6 font-semibold border-b border-b-gray-300">
							<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
								{" "}
								My Account{" "}
							</li>
							<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
								{" "}
								Notifications{" "}
							</li>
							<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
								{" "}
								Wishlist
							</li>
							<li className="block py-4 cursor-pointer pl-4 hover:bg-primary hover:text-white">
								{" "}
								Compare
							</li>
						</ul>
						<div className="flex justify-center">
							<button onClick={() => {
								dispatch(logout(navigate))
							}} className="w-28 py-2 mt-4 mx-auto bg-primary text-white hover:bg-secondary transition-all duration-300">
								Logout
							</button>
						</div>
					</>
				) : null}
			</div>
		</Drawer>
	);
}

export default MenuDrawer