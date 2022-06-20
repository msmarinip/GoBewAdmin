import { Form, Formik } from 'formik';
import { TextInput } from '../form/TextInput';
import * as Yup from 'yup';
import axios from "axios";
import { useCallback, useState } from 'react';
import '../../scss/_loginAdmin.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
const { REACT_APP_APIURL } = process.env;
export const ChangePass = () => {
  const { userId, hash, userEmail } = useParams();
  const [ok, setOk] = useState({
    ok: '',
    msg: ''
  })

  const navigate = useNavigate();
  const cbCheckPass = useCallback( async () => {
    try {
      
        const response = await axios.get(`${REACT_APP_APIURL}users/checkResetPass/${userId}/${hash}/${userEmail}`);
        
        if(response.data.ok){
          setOk({ok:true, msg:response.data.msg})
        } else {
          setOk({ok: false, msg:response.data.msg})
        }
  
      } catch (error) {
        
        setOk({ok: false, msg:'Ha ocurrido un error, por favor intente nuevamente.'})
          
      }
  }, [userId, hash, userEmail]);


  const changePassword = async (userPassword) => {
    try {
        const objUser = {
            userId,
            userEmail,
            userPassword
        }
        const response =  await axios.put(`${REACT_APP_APIURL}users/changePass`, objUser);
        const data = response.data;
        
        if(data.ok){
            if(data.user.userIsActive && (data.user.userIsAdmin || data.user.userIsSuperAdmin))
            {    sessionStorage.setItem('userFirstName', data.userfirstName);
                sessionStorage.setItem('userId', data.userId);
                sessionStorage.setItem('userIsAdmin', data.userIsAdmin);
                sessionStorage.setItem('userIsSuperAdmin', data.userIsSuperAdmin);
                // alert('La password fue modificada')
                toast.success('La password fue modificada')
                return navigate('/', {replace: true})
            }
            else {
                setOk({ok: false, msg: 'No tiene permiso para ingresar.'})
            }
        } else {
          setOk({ok: false, msg: 'Usuario no encontrado'})
        }      
    } catch (error) {
        setOk({ok: false, msg: 'Ha ocurrido un error, por favor intente nuevamente.'})
    }
  }

  useEffect(() => {
    cbCheckPass();
  },[cbCheckPass])
  
  return (

  <div className='login--content__container'>
    {ok.ok === false && <span>{ok.msg} </span>}
    { ok.ok && 
    <Formik
      //  enableReinitialize={true}
      initialValues={{ userPassword:'', userPasswordConfirm:'' }}
      validationSchema={Yup.object({
        userPassword: Yup.string().min(6, 'Requerida').required('Required'),
        userPasswordConfirm: Yup.string().min(6, 'Requerida')
            .required('Required')
            .oneOf([Yup.ref('userPassword')], 'La contraseña y su confirmación deben coincidir.')
        })
    }
    onSubmit={(values, actions) => {
      
      console.log(1, values)
      changePassword(values.userPassword)
    }}
    
    >
      {props => (
        <section className='form--login__container'>
          <Form className='form--login'>
            <div className='form--login--tittle__container'>
              <h1>CAMBIAR CONTRASEÑA</h1>
            </div>
            <div className='form--login__input--container'>
              <TextInput name='userPassword' type='password' placeholder='Constraseña'/>
            </div>
            <div className='form--login__input--container'>
              <TextInput name='userPasswordConfirm' type='password' placeholder='Confirmar constraseña'/>
            </div>
            <div className='form--login__btn'>
              <button type="submit">Enviar</button>
            </div>

            
          </Form>
        </section>
      )}
    </Formik>
    }
  </div>
)};
