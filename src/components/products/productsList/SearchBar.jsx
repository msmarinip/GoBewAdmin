import React from 'react'
import { useDispatch } from 'react-redux'
import { GET_PRODUCTS, SEARCH_PRODUCT } from '../../../redux/actions'

export default function SearchBar() {
    
    const dispatch = useDispatch()
    const handleChange = (e)=>{
        if(e.target.value === ''){
            dispatch(GET_PRODUCTS())
            return
        }
        dispatch(SEARCH_PRODUCT(e.target.value))
    }
    
    return (
        <>
            <input type="text" onChange={handleChange} placeholder = "Nombre del producto..."/>
        </>
    )
}
