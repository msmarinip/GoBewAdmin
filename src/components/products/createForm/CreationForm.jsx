import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CREATE_PRODUCT, GET_CATEGORIES_ADMIN } from "../../../redux/actions";
import validateForm from "../validation/validateForm";

export default function CreationForm() {

    let dispatch = useDispatch();
    const categories = useSelector((state) => state.adminReducer.categories)

    const [input, setInput] = useState({
        productName: '',
        productIsActive: true,
        productDescription: '',
        productPrice: '',
        productStock: '',
        productHighlight: false,
        productCategories: []
    })

    const [error, setError] = useState('');
    const [disabledImg, setDisabledImg] = useState(true);

    function handleChange(event) {
        setInput((prevState) => {
            const newState = {
                ...prevState,
                [event.target.name]: event.target.value
            };
            setError(validateForm(newState))
            return newState;
        })
    }

    function handleSelect(event) {
        if (input.productCategories.length < 5 && input.productCategories.indexOf(event.target.value) === -1 && input.productCategories.indexOf(event.target.value) !== '') {
                setInput({
                    ...input,
                    productCategories: [...input.productCategories, event.target.value]
                })
        }
    }

    function handleDeleteBtn(e) {
        let res = input.productCategories.filter(categ => categ !== e.target.name)
        setInput({
            ...input,
            productCategories: res
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        if (input.productName.length === 0) {
            setError(1)
            alert('Error: Ingresa los datos')
        } else if (Object.keys(error).length === 0) {
            console.log('Hola')
            dispatch(CREATE_PRODUCT(input));
            alert('Producto creado');
            setDisabledImg(false)
        } else {
            console.log(Object.keys(error).length)
            alert('Error: Corregi los errores')
        }
        setInput({
            productName: '',
            productIsActive: '',
            productDescription: '',
            productPrice: '',
            productStock: '',
            productHighlight: '',
            productCategories: [],
            productImage: ''
        })
    }

    useEffect(() => {
        dispatch(GET_CATEGORIES_ADMIN());
    }, [dispatch])

    return <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Nombre: </label>
                <input type="text" placeholder="Nombre..." onChange={(e) => handleChange(e)} value={input.productName} name='productName' />
                <span>{error.productName}</span>
            </div>
            <div>
                <label>Descripcion: </label>
                <input type="text" placeholder="Descripcion..." onChange={(e) => handleChange(e)} value={input.productDescription} name='productDescription' />
                <span>{error.productDescription}</span>
            </div>
            <div>
                <label>Precio: </label>
                <input type="text" placeholder="Price..." onChange={(e) => handleChange(e)} value={input.productPrice} name='productPrice' />
                <span>{error.productPrice}</span>
            </div>
            <div>
                <label>Stock: </label>
                <input type="text" placeholder="Stock..." onChange={(e) => handleChange(e)} value={input.productStock} name='productStock' />
                <span>{error.productStock}</span>
            </div>
            <div>
                <label>Categoria: </label>
                {categories?.map((categ) => (
                    <Fragment key={categ._id}>
                        <ul key={categ._id}><li>{categ.categoryName}</li></ul>
                        <select onChange={(e) => handleSelect(e)}>
                            <option value="">Selecciona categoria</option>
                            {categ.childCategories?.map((child) => {
                                return <Fragment key={child._id}>
                                    <option key={child._id} value={child._id} >{child.categoryName}</option>
                                </Fragment>
                            })}
                        </select>
                    </Fragment>
                ))}
            </div>
            <div>
                <ul key={input.productCategories[0]}>
                    <li key={input.productCategories[0]}>{input.productCategories?.map((el) => <span key={el}>{el} <button name={el} onClick={(e) => handleDeleteBtn(e)}>X</button></span>)}</li>
                </ul>
            </div>
            <div>
                <Link to={'/categories/new'}><button>Crear categoria</button></Link>
            </div>
            <div>
                <label>Activo: </label>
                <input type="radio" onClick={(e) => handleChange(e)} value={true} name='productIsActive' /> Si
                <input type="radio" onClick={(e) => handleChange(e)} value={false} name='productIsActive' /> No
                <span>{error.productIsActive}</span>
            </div>
            <div>
                <label>Destacado: </label>
                <input type="radio" onClick={(e) => handleChange(e)} value={true} name='productHighlight' /> Si
                <input type="radio" onClick={(e) => handleChange(e)} value={false} name='productHighlight' /> No
                <span>{error.productHighlight}</span>
            </div>
            <div>
                <button type="submit" >Crear producto</button>
            </div>
        </form>
        <span>Luego de crear su producto haga click en este boton</span>
        <div>
            <Link to={'/product/image'}><button disabled={disabledImg}>Agregar imagen</button></Link>
        </div>
    </div>
}