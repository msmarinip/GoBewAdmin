import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GET_PRODUCTS, ORDER_PRODUCT } from '../../../redux/actions';
import '../../../scss/_productsAdmin.scss'
import SearchBar from './SearchBar';
import TableRow from './TableRow';
import ReactPaginate from 'react-paginate';
import { TiArrowRightThick, TiArrowLeftThick } from 'react-icons/ti'

export default function ItemProduct() {

    const { products } = useSelector((store) => store.adminReducer);
    const dispatch = useDispatch();

    const [valueButtonPrice, setValueButtonPrice] = useState('ASC')
    const [valueButtonName, setValueButtonName] = useState('ASC')
    const [valueButtonStock, setValueButtonStock] = useState('ASC')

    //!PAGINATION
    const [currentProducts, setCurrentProducts] = useState(products);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemPerPage = 5;

    useEffect(() => {
        dispatch(GET_PRODUCTS())
    }, [dispatch]);

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;
        setCurrentProducts(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemPerPage));
    }, [products, itemOffset, itemPerPage]);



    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * itemPerPage;
        setItemOffset(offset);
    }


    //! ORDERS


    const handleAlphaOrder = () => {
        let prod = [...products];
        if (valueButtonName === 'ASC') {
            let productsSorted = prod.sort((a, b) => {
                if (a.productName < b.productName) return -1
                if (a.productName > b.productName) return 1
                return 0
            })
            dispatch(ORDER_PRODUCT(productsSorted))
            setValueButtonName('DESC')
            console.log(productsSorted)
        }
        if (valueButtonName === 'DESC') {
            let productsSorted = prod.sort((a, b) => {
                if (a.productName < b.productName) return 1
                if (a.productName > b.productName) return -1
                return 0
            })
            dispatch(ORDER_PRODUCT(productsSorted))
            setCurrentProducts(productsSorted)
            setValueButtonName('ASC')
        }
    }


    const handlePriceOrder = () => {
        let prod = [...products]
        if (valueButtonPrice === 'ASC') {
            let productsSorted = prod.sort((a, b) => {
                if (a.productPrice < b.productPrice) return -1
                if (a.productPrice > b.productPrice) return 1
                return 0
            })
            dispatch(ORDER_PRODUCT(productsSorted))
            setValueButtonPrice('DESC')
        }
        if (valueButtonPrice === 'DESC') {
            let productsSorted = prod.sort((a, b) => {
                if (a.productPrice < b.productPrice) return 1
                if (a.productPrice > b.productPrice) return -1
                return 0
            })
            dispatch(ORDER_PRODUCT(productsSorted))
            setValueButtonPrice('ASC')
        }
    }

    const handleStockOrder = () => {
        let prod = [...products]
        if (valueButtonStock === 'ASC') {
            let productsSorted = prod.sort((a, b) => {
                if (a.productStock < b.productStock) return -1
                if (a.productStock > b.productStock) return 1
                return 0
            })
            dispatch(ORDER_PRODUCT(productsSorted))
            setValueButtonStock('DESC')
        }
        if (valueButtonStock === 'DESC') {
            let productsSorted = prod.sort((a, b) => {
                if (a.productStock < b.productStock) return 1
                if (a.productStock > b.productStock) return -1
                return 0
            })
            dispatch(ORDER_PRODUCT(productsSorted))
            setValueButtonStock('ASC')
        }
    }

    return (
        <section className='products--content__container'>
            <div className='products--title__content'>
                <h1>Productos</h1>
            </div>
            <div className='products--buttons__container'>
                <SearchBar />
                <div className='products--buttons'>
                    <button onClick={handleAlphaOrder} value={valueButtonName}>
                        {valueButtonName === 'ASC' ? 'Nombre 🡅' : 'Nombre 🡇'}
                    </button>
                    <button onClick={handlePriceOrder} value={valueButtonPrice}>
                        {valueButtonPrice === 'ASC' ? 'Precio 🡇' : 'Precio 🡅'}
                    </button>
                    <button onClick={handleStockOrder} value={valueButtonStock}>
                        {valueButtonStock === 'ASC' ? 'Stock 🡇' : 'Stock 🡅'}
                    </button>
                </div>
                <Link to='/product/new'>
                    <button> + Agregar nuevo producto</button>
                </Link>
            </div>
            <table className='products--table'>
                <thead className='products--table__headers'>
                    <tr>
                        <th className='products--table__column--name'>Nombre del producto</th>
                        <th className='products--table__column--stock'>Stock</th>
                        <th className='products--table__column--price'>Precio</th>
                        <th className='products--table__column--active'>Activo</th>
                        <th className='products--table__column--actions'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='products--table__body'>
                    {
                        currentProducts?.map(p => {
                            return (
                                <TableRow className="products--table__rows" {...p} productName={p.productName} productStock={p.productStock} productPrice={p.productPrice} productIsActive={p.productIsActive} _id={p._id} key={p._id} />
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='products--pagination__container'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<TiArrowRightThick />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={<TiArrowLeftThick />}
                    renderOnZeroPageCount={null}
                />
            </div>
        </section>
    )
}
