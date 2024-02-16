/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "antd";

import CustomInput from "../components/form/CustomInput";
import CustomPhoneInput from "../components/form/CustomPhoneInput";
import PageChangeMotion from "../components/_common/PageChangeMotion";

import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { FaAnglesLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/auth";

// Icons 
import { AiOutlineLoading } from "react-icons/ai";


const Login = () => {
	const [phoneLogin, setPhoneLogin] = useState(false);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({});

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ formData, navigate }));
	};

	return (
		<>
			<div className="section_padding relative responsive_pb flex flex-col md:flex-row md:items-center md:justify-center md:h-screen overflow-y-auto overflow-x-hidden width_limit">
				<Link
					to={"/"}
					className="md:absolute mb-2 flex items-center gap-1 md:gap-2  md:top-6 md:left-10 font-medium md:text-base text-primary hover:text-primary/90"
				>
					<FaAnglesLeft className=" text-xs" /> Home
				</Link>
				<div className="md:flex bg-white space-y-5 md:space-y-0 border border-black/15 rounded-md overflow-hidden">
					<div className="md:w-96 w-full px-6 py-3 sm:px-10 sm:py-6">
						<h2 className="font-bold text-center text-2xl text-primary tracking-wide">
							Welcome Back !
						</h2>
						<p className="text-black/70 text-center text-sm mt-1">
							Login to your account.
						</p>

						<form onSubmit={onSubmit} className="mt-8">
							{!phoneLogin ? (
								<CustomInput
									label="email"
									type="email"
									placeholder="johndoe@example.com"
									setFormData={setFormData}
								/>
							) : (
								<CustomPhoneInput setFormData={setFormData} />
							)}
							<button
								onClick={() => setPhoneLogin((prev) => !prev)}
								type="button"
								className="text-primary mt-1 text-xs w-full block text-end hover:underline"
							>
								{phoneLogin
									? "*Use Email Instead"
									: "*Use Phone Number Instead"}
							</button>
							<div className="mt-4">
								<CustomInput
									label="password"
									type="password"
									placeholder="Password"
									setFormData={setFormData}
								/>
							</div>
							<div className="mt-4 flex font-medium text-black/60 items-center justify-between">
								<div>
									<Checkbox className="text-xs hover:text-primary">
										Remember me
									</Checkbox>
								</div>
								<Link className="text-xs block underline hover:text-primary">
									Forgot Password ?
								</Link>
							</div>
							<button
								disabled={auth.status === "loading"}
								className="w-full rounded-full h-10 mt-8 bg-primary text-white font-semibold hover:bg-secondary transition-all"
							>
								{auth.status === "loading" ? <AiOutlineLoading className="white font-bold test-3xl animate-spin mx-auto" /> : "Login"}
							</button>
						</form>
						<div className="text-center mt-6 space-y-2">
							<p className="text-xs text-black/60">or Login with</p>
							<div className="flex text-3xl items-center justify-center space-x-4">
								<button className="hover:scale-105 transition-all">
									<FcGoogle />
								</button>
								<button className="hover:scale-105 text-[#316FF6] transition-all">
									<SiFacebook />
								</button>
							</div>
							<p className="text-xs text-black/60">Don't have an account?</p>
							<Link className="text-primary block hover:underline  transition-all hover:underline-offset-2 font-medium">
								Register Now
							</Link>
						</div>
					</div>
					<div className="w-full md:w-56 lg:w-96  bg-black self-stretch">
						<img
							className="w-full h-full object-cover"
							src="/img/loginBanner.jpg"
							alt="loginBanner"
						/>
					</div>
				</div>
			</div>
			<PageChangeMotion />
		</>
	);
};

export default Login;
