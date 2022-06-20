import React, { useEffect, useState } from 'react'
import { Form, Formik, Field } from 'formik'
import { TextInput } from '../form/TextInput'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import CheckBox from '../form/CheckBox'
import { CREATE_PRODUCT, GET_CATEGORIES_ADMIN, GET_PRODUCT_BY_ID, PRODUCT_RESET, PUT_FULL_PRODUCT, } from '../../redux/actions'
import { useNavigate, useParams } from 'react-router-dom'
import '../../scss/_productsForm.scss'
import { toast } from 'react-toastify'
import CreationImage from './createForm/CreationImage'

export default function ProductForm() {
    const { categories, product } = useSelector((state) => state.adminReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const initialValues = {
        productId: productId ? productId : '',
        productName: product[0] ? product[0]?.productName : '',
        productIsActive: product[0] ? product[0]?.productIsActive : 0,
        productDescription: product[0] ? product[0]?.productDescription : '',
        productPrice: product[0] ? product[0]?.productPrice : '',
        productStock: product[0] ? product[0]?.productStock : '',
        productIsHighLight: product[0] ? product[0]?.productIsHighLight : 0,
        productCategories: product[0] ? product[0]?.productCategories : [],
    }
    const [created, setCreated] = useState(false)
    const [disabledImg, setDisabledImg] = useState(true);
    const [categoriesSelected, setCategoriesSelected] = useState(product[0] ? product[0]?.categories[0]?.categorySupId : [])
    console.log(categoriesSelected);
    console.log(product);
    const validations = Yup.object().shape({
        productName: Yup.string()
            .required('Requerido.'),
        productPrice: Yup.number()
            .required('Requerido.'),
        productStock: Yup.number()
            .required('Requerido.'),
        productCategories: Yup.array()
            .required('Requerido.')
    });

    useEffect(() => {
        dispatch(GET_CATEGORIES_ADMIN())
        !!productId && dispatch(GET_PRODUCT_BY_ID(productId))
    }, [dispatch, productId])

    useEffect(() => {
        if (created) {
            if (product.ok) {
                if (productId) {
                    toast.success('Producto actualizado correctamente')
                } else {
                    toast.success('Producto creado correctamente')
                }
                navigate(`/`)
            } else if (!product.ok) {
                for (const key in product.errors) {
                    toast.error(product.errors[key].msg)
                }
                if (product.msg) {
                    toast.error(product.msg)
                }
            }
        }

    }, [product])

    useEffect(() => {
        return () => {
            setCreated(!created)
            dispatch(PRODUCT_RESET())
        }
    }, [])
    useEffect(() => {
        if (product.ok || product.length > 0) {
            setCategoriesSelected(product[0]?.categories[0]?.categorySupId)
        }

    }, [product])
    //!IMGS
    const [img, setImg] = useState(product[0] ? product[0].images : []);
    // const {productId} = useParams();
    const [primaryPic, setPrimaryPic] = useState("");

    useEffect(() => {
        if (product.ok || product.length > 0) {
            setImg(product[0]?.images);
            setPrimaryPic(product[0]?.images[0]);
        }
    }, [product])








    return (
        <div className='form--newProduct__container'>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values) => {
                    try {
                        setCreated(true)
                        console.log(1, values)
                        if (productId) {
                            console.log(values)
                            dispatch(PUT_FULL_PRODUCT({ values, img, primaryPic }))
                            // dispatch(GET_PRODUCT_BY_ID(productId))
                            setDisabledImg(false)
                        } else {
                            dispatch(CREATE_PRODUCT({ values, img, primaryPic }))
                            setDisabledImg(false)

                        }
                    } catch (error) {
                        alert("Se ha producido un error al cargar el producto, intente nuevamente")
                    }
                }}
                validationSchema={validations}

            >
                {
                    (formik) => (
                        <Form className='form-newProduct'>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <div className='form-newProduct__inputs'>
                                    <TextInput key={1} label='Nombre' name='productName' type='text' placeholder='Nombre' />
                                    <TextInput key={3} label='Precio' name='productPrice' type='number' placeholder='Precio' />
                                    <TextInput key={4} label='Stock' name='productStock' type='number' placeholder='Stock' />
                                    <div className='form-newProduct__checkboxs'>
                                        <div className='checkbox-container'>
                                            <CheckBox key={5} label='Destacado' type='checkbox' name='productIsHighLight' />
                                        </div>
                                        <div className='checkbox-container'>
                                            <CheckBox key={6} label='Activo' type='checkbox' name='productIsActive' />
                                        </div>
                                    </div>
                                    <div className='form-newProduct__textarea'>
                                        <label htmlFor="productDescription" className='textAreaLabel'> Descripción</label>
                                        <Field as="textarea" name="productDescription" key={2} label='Descripción' class="textArea" placeholder='Descripción' />
                                    </div>
                                </div>
                                <article className='form-newProduct__continue'>
                                    <div className='form-newProduct__categories'>
                                        <select name="category-sup" disabled={formik.values.productCategories.length > 0} onChange={(e) => setCategoriesSelected(e.target.value)}>
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map((category, index) => {
                                                return <option key={index} value={category._id}>{category.categoryName}</option>
                                            })}
                                        </select>
                                        <div className='checkboxs-categories' >
                                            {categoriesSelected && categories?.map(c => {
                                                if (c._id === categoriesSelected) {
                                                    return c.childCategories.map((subCategory, index) => {
                                                        return <div className='childCategories'>
                                                            <label htmlFor={subCategory._id}>
                                                                {subCategory.categoryName}
                                                            </label>
                                                            <Field key={subCategory._id} type="checkbox" name="productCategories" id={subCategory._id} value={subCategory._id} />
                                                        </div>
                                                    })
                                                }
                                                else { return }
                                            })}
                                        </div>
                                    </div>
                                    <div className='form-newProduct__images'>
                                        <CreationImage img={img} setImg={setImg} setPrimaryPic={setPrimaryPic} />
                                    </div>
                                </article>
                            </div>
                            <div className='form-newProduct__btn'>
                                <button type='submit' className='form-newProduct--btn'>{productId ? "Actualizar Producto" : "Agregar Product"} </button>
                            </div>
                        </Form >
                    )
                }
            </Formik >
        </div >
    )
}

