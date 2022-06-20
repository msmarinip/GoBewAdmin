import { Form, Formik } from 'formik';
import { TextInput } from '../form/TextInput';
import * as Yup from 'yup';
import axios from "axios";
import '../../scss/_loginAdmin.scss'
import { toast } from 'react-toastify'
const { REACT_APP_APIURL } = process.env;
export const RememberPass = () => {
  


  const sendMailResetPass = async (values) => {
    try {
      const response = await axios.post(`${REACT_APP_APIURL}users/admin/resetPass`, values);
      if(response.data.ok){
        toast.success(response.data.msg)
      } else {
        toast.error(response.data.msg)
      }

    } catch (error) {
        toast.error('Ha ocurrido un error, por favor intente nuevamente.')
    }
  }

  return (

  <div className='login--content__container'>
    <Formik
      initialValues={{ userEmail:'' }}
      validationSchema={Yup.object({
        userEmail: Yup.string()
          .email('Debes ingresar un email válido')
          .required('Debes ingresar tu email para reestablecer la contraseña')
        })
    }
    onSubmit={(values) => {
      
      sendMailResetPass(values)
      
    }}
    
    >
      {props => (
        <section className='form--login__container'>
          <Form className='form--login'>
            <div className='form--login--tittle__container'>
              <h1>REESTABLECER CONTRASEÑA</h1>
            </div>
            <div className='form--login__input--container'>
              <TextInput name='userEmail' type='email' placeholder='e-mail'/>
            </div>
            <div className='form--login__btn'>
              <button type="submit">Enviar</button>
            </div>

            
          </Form>
        </section>
      )}
    </Formik>
    
  </div>
)};
