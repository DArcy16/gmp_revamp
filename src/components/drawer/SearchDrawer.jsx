import { Drawer } from 'antd';
import React from 'react'
import AutoCompleteBox from '../form/AutoCompleteBox';

const SearchDrawer = ({setOpenSearch, openSearch}) => {
  return (
		<Drawer
			title="Search"
			placement="top"
			onClose={() => setOpenSearch(false)}
			open={openSearch}
            height={"auto"}
            className='flex items-center justify-center'
		>
            <AutoCompleteBox drawer={true}/>
		</Drawer>
	);
}

export default SearchDrawer