import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { GET_PRODUCTS, PUT_PRODUCT, PUT_PRODUCT_ACTIVE } from '../../../redux/actions'
import { RiPencilFill } from 'react-icons/ri'
import { MdDoNotDisturbOn } from 'react-icons/md'
import { ImCheckboxChecked } from 'react-icons/im'
import { toast } from 'react-toastify'

export default function TableRow({ productName, productPrice, productStock, productIsActive, productCategories, _id }) {
    // console.log(productCategories);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)
    const [lowStock, setLowStock] = useState(false)
    const [productChange, setProductChange] = useState({
        productId: _id,
        productName,
        productPrice,
        productIsActive,
        productStock,
        productCategories,

    })

    const [ready, setReady] = useState(false)
    const handleChange = (e) => {
        setProductChange({
            ...productChange,
            [e.target.name]: e.target.value
        })
        setReady(true)
    }


    const handleSubmit = (e) => {
        try {
            console.log(productChange);
            dispatch(PUT_PRODUCT(productChange))
            setReady(false)
            setEdit(false)
          toast.success("Producto editado correctamente")

        } catch (error) {
            toast.error("Error al editar el producto")
        }
    }

    const handleProductActive = (e) => {
        dispatch(PUT_PRODUCT_ACTIVE({ productId: productChange.productId, productIsActive: !productChange.productIsActive }))
        dispatch(GET_PRODUCTS())
        setProductChange({ ...productChange, productIsActive: !productChange.productIsActive })
    }

    // useEffect(() => {
    //     setProductChange({ productName, productPrice, productStock, productIsActive, productId: _id, productCategories })
    // }, [productName, productPrice, productStock, _id, productIsActive, productCategories])


    useEffect(() => {
        if (productStock > 10) {
            setLowStock(true)
        }
    }, [productStock])

    return (
        <tr>
            {
                <td><input onChange={handleChange} type="text" value={productChange.productName} name="productName" disabled={!edit} /></td>
            }
            {
                <td className={lowStock ? "field--stock" : "low--stock"}> {<span>{!lowStock && "⚠"}</span>} <input onChange={handleChange} type="text" value={productChange.productStock} name="productStock" disabled={!edit} /></td>
            }
            {
                <td className='field--price'><input onChange={handleChange} type="text" value={productChange.productPrice} name="productPrice" disabled={!edit} /></td>
            }
            <td className='field--active'><input type="checkbox" checked={productChange.productIsActive} name="productIsActive" disabled style={{ width: "24px", height: "24px" }} /></td>
            <td className='field--actions'>
                {/* <input type="hidden" name={productCategories} /> */}
                <div className='btn--edits__container'>
                    <button className='table--products__btn-edit' onClick={() => setEdit(!edit)}><RiPencilFill className='btn--pencil' /></button>
                    <button className='table--products__btn-active' onClick={handleProductActive}>{productChange.productIsActive ? <MdDoNotDisturbOn /> : <ImCheckboxChecked />}</button>
                    {ready && <button className='table--products__btn-confirm' onClick={handleSubmit}>OK</button>}
                </div>
                <Link to={`/product/edit/${productChange.productId}`}>
                    <button className='table--products__btn-edit--all'>Editar todo el producto</button>
                </Link>
            </td>
        </tr>
    )
}
