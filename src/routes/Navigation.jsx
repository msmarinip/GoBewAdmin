import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../components/auth/Login';

import Nav from "../components/nav/Nav"
import CreationImage from '../components/products/createForm/CreationImage';
import CreationCategory from '../components/products/createForm/CreationCategory';

import { UserForm } from '../components/users/UserForm';
import { PrivateRoutes } from './PrivateRoutes';
import ItemProduct from '../components/products/productsList/ItemProduct';
import CreationFaq from '../components/company/faq/CreationFaq';
import Users from '../components/users/Users';
import { Activate } from '../components/users/Activate';
import ProductForm from '../components/products/ProductForm';
import { RememberPass } from '../components/auth/RememberPass';
// import FaqsCreated from '../components/company/faq/FaqsCreated';

import Orders from '../components/orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChangePass } from '../components/auth/ChangePass';
import { CompanyForm } from '../components/company/CompanyForm';
import { CategoryForm } from '../components/categories/CategoryForm';
export const Navigation = () => {
  return (
    <Router>
      <Nav />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        theme='colored'
      />
      <Routes>
        <Route path='/' element={
          <PrivateRoutes>
            <ItemProduct />
          </PrivateRoutes>
        } />
        <Route path='/faq' element={
          <PrivateRoutes>
            <CreationFaq />
          </PrivateRoutes>
        } />
        <Route exact path='/user' element={
          <PrivateRoutes>
            <Users />
          </PrivateRoutes>
        } />
        <Route exact path='/orders' element={
          <PrivateRoutes>
            <Orders/>
          </PrivateRoutes>
        } />
        <Route exact path='/product/new' element={
          <PrivateRoutes>
            <ProductForm />
          </PrivateRoutes>
        } />
        
        <Route exact path='/product/edit/:productId' element={
          <PrivateRoutes>
            <ProductForm />
          </PrivateRoutes>
        }/>
        <Route exact path='/categories/new' element={
          <PrivateRoutes>
            <CreationCategory />
          </PrivateRoutes>
        }/>
        <Route exact path='/product/image' element={
          <PrivateRoutes>
            <CreationImage />
          </PrivateRoutes>
        } />
        <Route exact path='/user/new' element={
          <PrivateRoutes>
            <UserForm />
          </PrivateRoutes>
        }/>
        <Route exact path='/company' element={
          <PrivateRoutes>
            <CompanyForm />
          </PrivateRoutes>
        }/>
        <Route exact path='/category' element={
          <PrivateRoutes>
            <CategoryForm />
          </PrivateRoutes>
        }/>
        <Route path='/login' element={<Login />} />
        <Route path='/activate/:userId/:hash/:userEmail' element={<Activate />} />
        <Route path='/reset/:userId/:hash/:userEmail' element={<ChangePass />} />
        <Route path='/rememberPass' element={<RememberPass/> }/>
      </Routes>
    </Router>
  )
}
