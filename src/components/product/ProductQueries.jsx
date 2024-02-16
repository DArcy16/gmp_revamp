import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const ProductQueries = () => {
  return (
		<div className='p-5 border border-black/15'>
			<h3 className="text-lg font-medium">Product Queries (0)</h3>

			<form onSubmit={(e) => e.preventDefault()} className="mt-4">
				<TextArea rows={4} placeholder="Write your questions here." onChange={(e) => console.log(e.target.value)}></TextArea>
				<button className='text-sm font-medium text-white bg-primary hover:bg-secondary mt-3 px-12 py-2 transition'>Submit</button>
			</form>

            <div className='mt-6'>
                <h4 className='font-medium'>Other Questions</h4>
                <p className='text-sm'>No one asked to seller yet.</p>
            </div>
		</div>
	);
}

export default ProductQueries