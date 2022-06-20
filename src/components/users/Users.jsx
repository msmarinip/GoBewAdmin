import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_USERS, GET_USERS_ACTIVE, GET_USERS_ADMINS } from '../../redux/actions';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';
import '../../scss/_usersAdmin.scss'
import ReactPaginate from 'react-paginate';
import {TiArrowRightThick , TiArrowLeftThick} from 'react-icons/ti'
import SearchBar from './SearchBar';

export default function Users() {
    
    const users = useSelector((store) => store.adminReducer.users);
    const dispatch = useDispatch();


    //!PAGINATION
    const [currentUsers, setCurrentUsers] = useState(users);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemPerPage = 3;


    //! ADMINS

    const [admin, setAdmin] = useState(true);
    const [checkedAdmin, setCheckedAdmin] = useState(false);
    const [disabledAdmin, setDisabledAdmin] = useState(false)


    const handleChangeAdmin = (e) => {
        console.log(e.target.value);
        setAdmin(!admin);
        setCheckedAdmin(!checkedAdmin);
        if(admin){
            dispatch(GET_USERS_ADMINS(admin));
            setDisabledActive(true);
        }else{
            dispatch(GET_USERS());
            setDisabledActive(false);
        }
    }

    //! ACTIVES

    const [active, setActive] = useState(true);
    const [checkedActive, setCheckedActive] = useState(false);
    const [disabledActive, setDisabledActive] = useState(false)


    const handleChangeActive = (e) => {
        console.log(e.target.value);
        setActive(!active);
        setCheckedActive(!checkedActive);
        if(active){
            dispatch(GET_USERS_ACTIVE(active));
            setDisabledAdmin(true);
        }else{
            dispatch(GET_USERS());
            setDisabledAdmin(false);
        }
    }

    useEffect(() => {
        dispatch(GET_USERS())
    }, [dispatch])

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;
        setCurrentUsers(users?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users?.length / itemPerPage));
    } , [users, itemOffset, itemPerPage]);
    
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * itemPerPage;
        setItemOffset(offset);
    }

    //! SUPERADMIN CHECK

    const userSuperAdmin = sessionStorage.getItem('userIsSuperAdmin');
    console.log(userSuperAdmin);

    return (
        <section className='users--content__container'>
            <div className='users--title__content'>
                <h1>Usuarios</h1>
            </div>
            <div className='users--buttons__container'>
                <SearchBar/>
                <div className='users--btn-radio__container'>
                    <label className='label--filter' htmlFor="userIsAdmin">Admins</label>
                    <input className='input--radio__btn' type="radio" name="userIsAdmin" value={admin} onClick={handleChangeAdmin} checked={checkedAdmin} disabled={disabledAdmin}/>
                </div>
                <div className='users--btn-radio__container'>
                    <label className='label--filter' htmlFor="userIsActive">Activos</label>
                    <input className='input--radio__btn' type="radio" name="userIsActive" value={active} onClick={handleChangeActive} checked={checkedActive} disabled={disabledActive} />
                </div>
                <Link to='/user/new'>
                    <button>Agregar nuevo usuario</button>
                </Link>
            </div>
            <table className='users--table'>
                <thead>
                    <tr className='users--table__headers'>
                        <th className='users--table__column-name'>Nombre</th>
                        <th className='users--table__column-lastName'>Apellido</th>
                        <th className='users--table__column-email'>Email</th>
                        <th className='users--table__column-active'>Activo</th>
                        <th className='users--table__column-admin'>Admin</th>
                        <th className='users--table__column-google'>Google</th>
                        <th className='users--table__column-superAdmin'>SuperAdmin</th>
                        {/* <th className='users--table__column-actions'>Acciones</th> */}
                        {userSuperAdmin === "true" && <th className='users--table__column-actions'>Acciones</th>}
                    </tr>
                </thead>
                <tbody className='users--table__body'>
                    {
                        currentUsers?.map(u =>{
                            return(
                                <TableRow userFirstName={u.userFirstName} userLastName={u.userLastName} userEmail={u.userEmail} userIsActive={u.userIsActive} userIsAdmin={u.userIsAdmin} userIsGoogle={u.userIsGoogle} userIsSuperAdmin={u.userIsSuperAdmin} _id={u._id} key={u._id} userSuperAdmin={userSuperAdmin}/>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='users--pagination__container'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel= {<TiArrowRightThick/>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={<TiArrowLeftThick/>}
                    renderOnZeroPageCount={null}
                />
            </div>
        </section>
    )
}
