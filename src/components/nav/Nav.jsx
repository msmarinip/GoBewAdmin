import React, { useEffect } from 'react'
import Logo from '../../images/Logo-GoBew.png'
import '../../scss/_navAdmin.scss'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'
// import { USER_LOGOUT } from '../../redux/actions'

export default function Nav() {
    // const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        (location.pathname !== '/login')
            && localStorage.setItem('lastPath', location.pathname)
    }, [location])

    const navigate = useNavigate();
    const handleLogout = () => {
        // dispatch(USER_LOGOUT());
        sessionStorage.removeItem('userFirstName');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userIsAdmin');
        sessionStorage.removeItem('userIsSuperAdmin');

        return    navigate('/login', {replace: true})
    }

    const userIdAdmin = sessionStorage.getItem('userId')

    return (
        <nav className='nav--content__container'>
            <div className='nav--logo__container'>
                <img src={Logo} alt='img not found' />
                <p className='nav--links'><Link to='/'>Productos</Link></p>
                <p className='nav--links'><Link to='/category'>Categorías</Link></p>
                <p className='nav--links'><Link to='/user'>Usuarios</Link></p>
                <p className='nav--links'><Link to='/orders'>Orders</Link></p>
                <p className='nav--links'><Link to='/faq'>FAQ</Link></p>
                <p className='nav--links'><Link to='/company'>Contacto</Link></p>
            </div>
            <div className='nav--btn__container'>
                {
                    userIdAdmin && <button className='navbar--btn' onClick={handleLogout}>Cerrar Sesión</button>
                }
            </div>
        </nav>
    )
}
