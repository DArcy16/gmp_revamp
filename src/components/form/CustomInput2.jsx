/** @format */

import { Input } from "antd";
import React from "react";

const CustomInput2 = ({label, type, placeholder, setFormData, name, formData}) => {
	return (
		<div>
			<label
				className="block capitalize text-start text-sm font-medium mb-2"
				htmlFor={label}
			>
				{label}
			</label>
			<Input
                styles={{width: "100%"}}
				id={label}
				type={type}
                name={name}
				placeholder={placeholder}
				required
                value={formData[name]}
				onChange={(e) =>
					setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
				}
				className="w-full px-4 py-2 border text-sm border-black/30 focus:outline-2 focus:outline-primary"
			/>
		</div>
	);
};

export default CustomInput2;
