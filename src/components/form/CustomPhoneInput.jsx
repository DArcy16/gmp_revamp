import React from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = ({setFormData}) => {
  return (
		<div>
			<label className="block capitalize text-start text-sm font-medium mb-2">
				Phone
			</label>
			<PhoneInput
				country={"mm"}
				inputProps={{
					name: "phone",
					required: true,
				}}
				containerClass="focus:outline focus:border-none focus:outline-2 focus:outline-primary"
                inputClass='focus:outline focus:border-none focus:outline-2 focus:outline-primary py-2'
				value={"95933020390"}
				inputStyle={{ borderRadius: "0px", width: "100%" }}
				buttonStyle={{ borderRadius: "0px" }}
				containerStyle={{ width: "100%" }}
				enableSearch
				placeholder="+95933020390"
                onChange={(phone) => setFormData(prev => ({...prev, phone: phone}))}
			/>
		</div>
	);
}

export default CustomPhoneInput