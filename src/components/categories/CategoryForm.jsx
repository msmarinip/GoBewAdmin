
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import '../../scss/_categoryAdmin.scss'

import { TextInput } from '../form/TextInput';
import { useCallback } from 'react';

const { REACT_APP_APIURL } = process.env;

export const CategoryForm = () => {
const initialState = {
    ok: false,
    categoryId: '',
    categoryName: '',
    categoryIsActive: true,
    categorySupId: ''
  }
const [category, setCategory] = useState(initialState)

const [superiores, setSuperiores] = useState([])

const cbSuperiores = useCallback( async () => {
  try {
    const response = await fetch(`${REACT_APP_APIURL}categories/superiores`)
    const data = await response.json()
      if(data){
        setSuperiores(c => data.superiores)

      } 

    } catch (error) {
      console.log(error)
      
        
    }
}, [setSuperiores]);

const [listCategories, setListCategories] = useState([])
const cbListCategories = useCallback( async () => {
  try {
    
    const response = await fetch(`${REACT_APP_APIURL}categories/`)
    const data = await response.json()
    // console.log(data)
    const arrCategories =[];
      if(data){
        data.forEach(element => {
            arrCategories.push({_id: element._id, categoryName: element.categoryName, child:false})
            element.childCategories?.forEach(c => {
                arrCategories.push({_id: c._id, categoryName: c.categoryName, child:true})
            })
        });
        setListCategories(c => arrCategories)

      } 

    } catch (error) {
      console.log(error)
      
        
    }
}, [setListCategories]);


useEffect(() => {
    cbSuperiores();
    
}, [cbSuperiores])


useEffect(() => {
    cbListCategories()
}, [cbListCategories])

const updateCategory = async (values) =>{
  
    try {
    const response = category?.categoryId !== ''
        ? await axios.put(`${REACT_APP_APIURL}categories/${category.categoryId}`, values)
        : await axios.post(`${REACT_APP_APIURL}categories/new`, values)
    
    const data = response.data;
    setCategory({...category, ...data.category})
    cbListCategories()
    toast.success('Los datos de contacto se actualizaron correctamente.')
    } catch (error) {
    toast.error('Error: Por favor, intente nuevamente.')
    }

}

const handleSelectChange = async ({ target }) => {
    try {
        if(target?.value !== ''){

            const response = await axios.get(`${REACT_APP_APIURL}categories/${target.value}`)
            const data = response.data;

            setCategory({
                categoryId: target.value,
                categoryName: data.categoryName,
                categorySupId: data.categorySupId ? data.categorySupId : '',
                categoryIsActive: data.categoryIsActive
            })

        } else {
            setCategory({...initialState})
        }
    
    } catch (error) {
        toast.error('Error al cargar los datos de la categoría seleccionada.')
    }
}

  return (




    <div className='category--content__container'>
  <Formik
      enableReinitialize = { true }
      initialValues = { category }
      validationSchema ={Yup.object({
        categoryName: Yup.string().required('El nombre de la empresa es requerido.')
        
        })
    }
    onSubmit={(values, actions) => {
      
      // console.log(values, actions)
      updateCategory(values);
      
    }}
    
    >
      {props => (
        <>
        <section className='form--category__container'>
        <div className='form--category__input--container'>
                <label>Seleccione una categoría</label><br />
              <Field  name='categoryId_selected' as='select' size={14} onChange={ handleSelectChange }>
                    <option value=''>Nueva</option>
                    {
                        listCategories && listCategories?.map(c => <option key={`c_${c._id}`} value={ c._id }>&nbsp;{c.child&& ' - '}{ c.categoryName }</option> )
                    }
              </Field>
            </div>
            
        </section>
        <section className='form--category__container'>
          <Form className='form--category'>
            <div className='form--category--tittle__container'>
              {category.categoryId ==='' ? <h2>Nueva categoría</h2> : <h2>Categoría: {category.categoryName}</h2> }
            </div>
            <div className='form--category__input--container'>
              <TextInput label="Nombre" name='categoryName' type='text'/>
            </div>
            <div className='form--category__input--container'>
                <label>Categoría superior</label>
              <Field  name='categorySupId' as='select'>
                    <option value=''>Ninguna</option>
                    {
                        superiores && superiores.map(c => <option key={c.categoryId} value={ c.categoryId }>{ c.categoryName }</option>)
                    }
              </Field>
            </div>
            <div className='form--category__input--container'>
                <label>
                    <Field type='checkbox' name='categoryIsActive' /> Activa
                </label>
                
            </div>

            <div className='form--category__btn'>
              <button type="submit">Guardar</button>
              
            </div>
            
          </Form>
        </section>
        </>
      )}
    </Formik>
    

    </div>
  )
}
