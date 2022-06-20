import React from 'react'
import { useDispatch } from 'react-redux';
import { GET_USERS, SEARCH_USERS } from '../../redux/actions';


export default function SearchBar() {
    
    const dispatch = useDispatch();
    const handleChange = (e)=>{
        if(e.target.value === ''){
            dispatch(GET_USERS())
            return
        }
        dispatch(SEARCH_USERS(e.target.value))
    }
    
    
    return (
        <>
            <input className='input--text' type="text" placeholder = "Nombre del usuario" onChange={handleChange}/>
        </>
    )
}