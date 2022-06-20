
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import '../../scss/_companyAdmin.scss'

import { TextInput } from '../form/TextInput';
import { useCallback } from 'react';
const { REACT_APP_APIURL } = process.env;

export const CompanyForm = () => {

const [company, setCompany] = useState({
  ok: false,
  companyId: '',
  companyName: 'GoBew',
  companyEmail: '',
  companyPhone: '',
  companyAddress: '',
  companyDescription: '',
  companyFacebook:  '',
  companyTwitter: '',
  companyInstagram: '',
  companyMap:  '',
  companyIsActive: true
})

const cbCompany = useCallback( async () => {
  try {
    
    const response = await fetch(`${REACT_APP_APIURL}company/getActive`)
    const data = await response.json()
    // console.log(data)
      if(data.ok){
        setCompany(c => data.company)

      } 

    } catch (error) {
      
      setCompany(c => ({...company, ok: false}))
        
    }
}, [company]);


useEffect(() => {
  cbCompany()
  
}, [cbCompany])

const updateCompany = async (values) =>{
  
try {
  const response = company?.companyId !== ''
    ? await axios.put(`${REACT_APP_APIURL}company/${company.companyId}`, values)
    : await axios.post(`${REACT_APP_APIURL}company`, values)
  
  const data = response.data;
  // console.log(data)
  setCompany({...company, ...data.company})
  toast.success('Los datos de contacto se actualizaron correctamente.')
} catch (error) {
  toast.error('Error: Por favor, intente nuevamente.')
}


}

  return (
    <div className='company--content__container'>


      <Formik
      enableReinitialize = { true }
      initialValues = { company }
      validationSchema ={Yup.object({
        companyName: Yup.string().required('El nombre de la empresa es requerido.'),
        companyEmail: Yup.string()
          .email('Debes ingresar un email válido')
          .required('El e-mail de la empresa es requerido.'),
        
        })
    }
    onSubmit={(values, actions) => {
      
      // console.log(values, actions)
      updateCompany(values);
      
    }}
    
    >
      {props => (
        <section className='form--company__container'>
          <Form className='form--company'>
            <div className='form--company--tittle__container'>
              <h1>Información de contacto</h1>
            </div>
            <div className='form--company__input--container'>
              <TextInput label="Nombre" name='companyName' type='text'/>
            </div>
            <div className='form--company__input--container'>
              <TextInput label="E-mail" name='companyEmail' type='email'/>
            </div>
            <div className='form--company__input--container'>
              <TextInput label="Teléfono" name='companyPhone' type='text'/>
            </div>
            <div className='form--company__input--container'>
              <TextInput label="Dirección" name='companyAddress' type='text'/>
            </div>
            
            <div className='form-company__textarea'>
                <label htmlFor="companyDescription" className='textAreaLabel'>Aclaraciones</label>
                <Field as="textarea" name="companyDescription" key={2} label='Descripción' className="textArea" placeholder='Descripción' />
            </div>

            <div className='form--company__btn'>
              <button type="submit">Guardar</button>
              
            </div>
            
          </Form>
        </section>
      )}
    </Formik>
    

    </div>
  )
}
