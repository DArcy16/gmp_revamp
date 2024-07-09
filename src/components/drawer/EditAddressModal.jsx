/** @format */

import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import CustomInput2 from "../form/CustomInput2";
import { API } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { updateAddress } from "../../redux/features/address";

const EditAddressModal = ({ isOpen, closeModal, id}) => {
	const dispatch = useDispatch();

	const editAddress = useSelector(state => state.address.data.filter(item => item.id === id)[0])
	const address = useSelector((state) => state.address);
	const auth = useSelector((state) => state.auth.auth);
	const [citiesOptions, setCitiesOptions] = useState([]);
	const [countriesOptions, setCountriesOptions] = useState([]);
	const [stateOptions, setStateOptions] = useState([]);
	const [formData, setFormData] = useState({
		id: "",
		address: "",
		country_id: null,
		city_id: null,
		state_id: null,
		postal_code: "",
		phone: "",
	});

	useEffect(() => {
		if(typeof editAddress === "object") {
			fetchStates(editAddress.country_id);
			fetchCities(editAddress.state_id);
			setFormData({
				id: editAddress.id,
				address: editAddress.address,
				country_id: editAddress.country_id,
				city_id: editAddress.city_id,
				state_id: editAddress.state_id,
				postal_code: editAddress.postal_code,
				phone: editAddress.phone,
			});
		}
	}, [editAddress])


	const fetchCountries = async () => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetch(`${API}countries`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!signal.aborted) {
					setCountriesOptions(
						data.data.map((item) => ({ value: item.id, label: item.name }))
					);
				}
			})
			.catch((error) => console.warn("Uh-oh.", error));
	};

	const fetchStates = async (id) => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetch(`${API}states-by-country/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!signal.aborted) {
					setStateOptions(
						data.data.map((item) => ({ value: item.id, label: item.name }))
					);
				}
			})
			.catch((error) => console.warn("Uh-oh.", error));
	};

	const fetchCities = async (id) => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetch(`${API}cities-by-state/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!signal.aborted) {
					setCitiesOptions(
						data.data.map((item) => ({ value: item.id, label: item.name }))
					);
				}
			})
			.catch((error) => console.warn("Uh-oh.", error));
	};

	const fetchPostalCode = (id) => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetch(`${API}postalcode-by-city/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!signal.aborted) {
					setFormData((prev) => ({ ...prev, postal_code: data.data }));
				}
			})
			.catch((error) => console.warn("Uh-oh.", error));
	};


	useEffect(() => {
		fetchCountries();
	}, []);

	const onCountriesSelectChange = (value) => {
		fetchStates(value);
		setFormData((prev) => ({ ...prev, country_id: value }));
	};

	const onStateSelectChange = (value) => {
		fetchCities(value);
		setFormData((prev) => ({ ...prev, state_id: value }));
	};

	const onCitySelectChange = (value) => {
		fetchPostalCode(value);
		setFormData((prev) => ({ ...prev, city_id: value }));
	};

	// Filter `option.label` match the user type `input`
	const filterOption = (input, option) =>
		(option?.label ?? "").toLowerCase().includes(input.toLowerCase());

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateAddress({ formData, token: auth.token, closeModal, setFormData })
		);
	};
	return (
		<Modal
			title="Edit Address"
			open={isOpen}
			centered
			onOk={closeModal}
			footer=""
			onCancel={closeModal}
		>
			<form
				className="space-y-4 pt-4 border-t border-t-black/15"
				onSubmit={onSubmit}
			>
				<CustomInput2
					label="No / Street"
					type="text"
					placeholder="Your Address"
					setFormData={setFormData}
					name="address"
					formData={formData}
				/>

				<div>
					<label className="block capitalize text-start text-sm font-medium mb-2">
						Country
					</label>
					<Select
						showSearch
						placeholder="Select Your Country"
						value={formData.country_id}
						style={{ width: "100%", borderRadius: "0px" }}
						filterOption={filterOption}
						onChange={onCountriesSelectChange}
						options={[...countriesOptions]}
					/>
				</div>

				<div>
					<label className="block capitalize text-start text-sm font-medium mb-2">
						State
					</label>
					<Select
						showSearch
						placeholder="Select State"
						value={formData.state_id}
						style={{ width: "100%", borderRadius: "0px" }}
						filterOption={filterOption}
						onChange={onStateSelectChange}
						options={[...stateOptions]}
					/>
				</div>

				<div>
					<label className="block capitalize text-start text-sm font-medium mb-2">
						City
					</label>
					<Select
						showSearch
						placeholder="Select City"
						value={formData.city_id}
						style={{ width: "100%", borderRadius: "0px" }}
						filterOption={filterOption}
						onChange={onCitySelectChange}
						options={[...citiesOptions]}
					/>
				</div>
				<CustomInput2
					label="Postal Code"
					type="text"
					placeholder="Postal Code"
					disabled={true}
					setFormData={setFormData}
					name="postal_code"
					formData={formData}
				/>
				<CustomInput2
					label="Phone"
					type="number"
					placeholder="+95"
					disabled
					setFormData={setFormData}
					name="phone"
					formData={formData}
				/>

				<button className="w-24 mx-auto block py-2 bg-primary text-white text-sm font-bold hover:bg-secondary transition">
					{address.updateStatus === "loading" ? (
						<AiOutlineLoading className="white font-bold test-3xl animate-spin mx-auto" />
					) : (
						"Edit"
					)}
				</button>
			</form>
		</Modal>
	);
};

export default EditAddressModal;
