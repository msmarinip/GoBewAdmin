import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { GET_ALL_ORDERS, ORDER_ORDERS } from "../../redux/actions";
import TableOrders from "./TableOrders";
import '../../scss/_orderAdmin.scss'
import DetailOrder from "./DetailOrder";
import ReactPaginate from "react-paginate";
import { TiArrowRightThick, TiArrowLeftThick } from 'react-icons/ti'

export default function Orders() {

    let dispatch = useDispatch();
    let orders = useSelector((state) => state.adminReducer.orders)

    const [ordId, setOrdId] = useState('');
    const [valueOrder, setValueOrder] = useState('ASC')

    //!PAGINATION
    const [currentOrders, setCurrentOrders] = useState(orders);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemPerPage = 5;

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * itemPerPage;
        setItemOffset(offset);
    }

    useEffect(() => {
        dispatch(GET_ALL_ORDERS())
    }, [dispatch])

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;
        setCurrentOrders(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemPerPage));
    }, [orders, itemOffset, itemPerPage]);

    function handleDateOrder() {
        let undefDate = []
        let ordersFull = []
        let ord = [...orders]
        ord.forEach(elem => {
            if(elem.orderAceptDate === null) undefDate.push(elem)
            else ordersFull.push(elem)
        })
        if (valueOrder === 'ASC') {
            let ordersSort = ordersFull.sort((a, b) => {
                return new Date(b.orderAceptDate).getTime() - new Date(a.orderAceptDate).getTime()
            })
            undefDate.forEach(elem => {
                ordersSort.push(elem)
            })
            dispatch(ORDER_ORDERS(ordersSort))
            setValueOrder('DESC')
        }
        if (valueOrder === 'DESC') {
            let ordersSort = ordersFull.sort((a, b) => {
                return new Date(a.orderAceptDate).getTime() - new Date(b.orderAceptDate).getTime()
            })
            undefDate.forEach(elem => {
                ordersSort.push(elem)
            })
            dispatch(ORDER_ORDERS(ordersSort))
            setValueOrder('ASC')
        }
    }

    return (
        <section className="orders--content__container">
            <div className="orders--title__content">
                <h1>Ordenes de compra</h1>
            </div>
            <div className="orders--filter__content">
                <button onClick={handleDateOrder} value={valueOrder}>
                    {valueOrder === 'ASC' ? 'Fecha 🡅' : 'Fecha 🡇'}
                </button>
            </div>
            <table className='orders--table'>
                <thead className='orders--table__headers'>
                    <tr>
                        <th className='orders--table__column--date'>Fecha</th>
                        <th className='orders--table__column--idOrder'>Numero de orden</th>
                        <th className='orders--table__column--firstName'>Nombre</th>
                        <th className='orders--table__column--lastName'>Apellido</th>
                        <th className='orders--table__column--totPrice'>Importe</th>
                        <th className='orders--table__column--detail'>Detalle</th>
                    </tr>
                </thead>
                <tbody className="orders--table__body">
                    {
                        currentOrders?.map(elem => {
                            return (
                                <TableOrders key={elem._id} className='orders--table__rows' setOrdId={setOrdId} orderId={elem._id} userFirstName={elem.user[0]?.userFirstName} userLastName={elem.user[0]?.userLastName} dates={elem.orderAceptDate ? elem.orderAceptDate : elem.orderCreationDate} totalPrice={elem.orderTotal} />
                            )
                        })
                    }

                </tbody>
            </table>
            <div className='orders--pagination__container'>
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
            <div>
                <DetailOrder orderId={ordId} setOrdId={setOrdId} />
            </div>
        </section>
    )
}