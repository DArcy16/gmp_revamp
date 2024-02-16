import { Dropdown, Space } from 'antd';
import React from 'react'

import { AiOutlineDown } from "react-icons/ai";


const items = [
	{
		key: "1",
		label: <button>English</button>,
		icon: <img className=" w-8" src="/img/en.jpg" alt="en" />,
	},
	{
		key: "2",
		label: <button>Myanmar</button>,
		icon: <img className=" w-8" src="/img/mm.jpg" alt="mm" />,
	},
];

const LocaleDropDown = () => {
  return (
		<Dropdown
			className="w-48 cursor-pointer text-xs lg:text-sm"
			menu={{ items }}
		>
			<a onClick={(e) => e.preventDefault()}>
				<Space>
					Locale
					<AiOutlineDown className="text-xs" />
				</Space>
			</a>
		</Dropdown>
	);
}

export default LocaleDropDown