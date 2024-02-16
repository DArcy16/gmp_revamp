import React from 'react'
import ProductsSlider from './ProductsSlider'
import useFetch from '../../hooks/useFetch'

const ShowProduct = ({title, url, link, type=""}) => {
  const {response: products, loading} = useFetch(url);

  return (
    <div className='section_padding'>
        <h2 className='text-xl font-bold tracking-normal mb-4'>{title}</h2>

        <ProductsSlider products={products?.data} loading={loading} link={link} type={`${type}`}/>
    </div>
  )
}

export default ShowProduct