import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GET_USERS, PUT_USERS, PUT_USER_ACTIVE } from '../../redux/actions';
import { MdDoNotDisturbOn } from 'react-icons/md'
import { ImCheckboxChecked } from 'react-icons/im'
import { RiPencilFill } from 'react-icons/ri'

export default function TableRow({ userFirstName, userLastName, userEmail, userIsActive, userIsAdmin, userIsGoogle, userIsSuperAdmin, _id, userSuperAdmin }) {
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch();
    const [userChange, setUserChange] = useState({
        userId: _id,
        userFirstName,
        userLastName,
        userEmail,
        userIsActive,
        userIsAdmin,
        userIsGoogle,
        userIsSuperAdmin
    })
    const [ready, setReady] = useState(false)

    // eslint-disable-next-line
    const handleChange = (e) => {
        setUserChange({
            ...userChange,
            [e.target.name]: e.target.value
        })
        setReady(true)
    }

    const handleCheckEvent = (e) => {
        setUserChange({
            ...userChange,
            [e.target.name]: e.target.checked
        })
        setReady(true)
    }

    const handleSubmit = (e) => {
        dispatch(PUT_USERS(userChange))
        setReady(false)
        setEdit(false)
        alert("Usuario editado correctamente")
    }

    const handleUserActive = (e) => {
        dispatch(PUT_USER_ACTIVE({ userId: userChange.userId, userIsActive: !userChange.userIsActive }))
        setUserChange({ ...userChange, userIsActive: !userChange.userIsActive })
        dispatch(GET_USERS())
    }

    return (
        <tr>
            <td className='field--name'>{userChange.userFirstName}</td>
            <td className='field--lastName'>{userChange.userLastName}</td>
            <td className='field--email'>{userChange.userEmail}</td>
            <td className='field--active'><input type="checkbox" checked={userChange.userIsActive} name="userIsActive" disabled /></td>
            <td className='field--admin'><input type="checkbox" checked={userChange.userIsAdmin} name="userIsAdmin" onClick={handleCheckEvent} disabled={!edit} /></td>
            <td className='field--google'><input type="checkbox" checked={userChange.userIsGoogle} name="userIsGoogle" onClick={handleCheckEvent} disabled={!edit} /></td>
            <td className='field--superAdmin'><input type="checkbox" checked={userChange.userIsSuperAdmin} name="userIsSuperAdmin" onClick={handleCheckEvent} disabled={!edit} /></td>
            {/* <td className='field--actions'>
                <button onClick={() => setEdit(!edit)}><RiPencilFill/></button>
                <button onClick={handleUserActive}>{userChange.userIsActive ? <MdDoNotDisturbOn/> : <ImCheckboxChecked/>}</button>
                {ready && <button onClick={handleSubmit}>OK</button>}
            </td> */}
            {userSuperAdmin === "true" && <td className='field--actions'>
                <button onClick={() => setEdit(!edit)}><RiPencilFill /></button>
                <button onClick={handleUserActive}>{userChange.userIsActive ? <MdDoNotDisturbOn /> : <ImCheckboxChecked />}</button>
                {ready && <button onClick={handleSubmit}>OK</button>}
            </td>}
        </tr>
    )
}