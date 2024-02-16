/** @format */

import React, { useState } from "react";

// Icons
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const CustomInput = ({
	label = "Email",
	type = "text",
	placeholder,
	setFormData,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div>
			<label
				className="block capitalize text-start text-sm font-medium mb-2"
				htmlFor={label}
			>
				{label}
			</label>
			{type === "password" ? (
				<div className="relative flex items-center">
					<input
						id={label}
						type={showPassword ? "text" : type}
						placeholder={placeholder}
						required
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, [label]: e.target.value }))
						}
						className="w-full px-4 py-2 border text-sm border-black/30 focus:outline-2 focus:outline-primary"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-4 hover:text-primary"
					>
						{showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
					</button>
				</div>
			) : (
				<input
					id={label}
					type={type}
					placeholder={placeholder}
					required
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, [label]: e.target.value }))
					}
					className="w-full px-4 py-2 border text-sm border-black/30 focus:outline-2 focus:outline-primary"
				/>
			)}
		</div>
	);
};

export default CustomInput;
