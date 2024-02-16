/** @format */

import React from "react";
import { Collapse, theme, Checkbox, Col, Row } from "antd";
import { slugify } from "../../utils/slugify";


const FilterCollapse = ({filter, options = [], name = "", setFilter}) => {
	const { token } = theme.useToken();

    const collapseItems = (panelStyle) => [
			{
				key: "1",
				label: <h3 className="font-medium">{name}</h3>,
				children: (
					<Checkbox.Group
						style={{
							width: "100%",
						}}
						className="font-medium"
						value={filter[slugify(name)]}
						onChange={(value) => setFilter(prev => ({
							...prev,
							[slugify(name)] : value
						}))}
					>
						<Row>
							{options?.map((item) => (
								<Col key={item?.value} className="mt-2" span={16}>
									<Checkbox value={item?.value}>{item?.label}</Checkbox>
								</Col>
							))}
						</Row>
					</Checkbox.Group>
				),
				style: panelStyle,
			},
		];

	const panelStyle = {
		background: token.colorBgContainer,
	};

	return (
		<Collapse
			style={{
				background: token.colorBgContainer,
			}}
			items={collapseItems(panelStyle)}
		/>
	);
};

export default FilterCollapse;
