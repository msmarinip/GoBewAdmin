import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CANCEL_STATUS_ORDER, GET_ORDER_BY_ID, RECIEVE_STATUS_ORDER, SEND_STATUS_ORDER } from "../../redux/actions"
import '../../scss/_orderAdmin.scss'

export default function DetailOrder({ orderId, setOrdId }) {

    let dispatch = useDispatch()
    let { order } = useSelector((state) => state.adminReducer)

    const [status, setStatus] = useState('')

    function renderOptions(statusInfo) {
        switch (statusInfo) {
            case 'Pago aceptado':
                return <form onChange={(e) => setStatus(e.target.id)} onSubmit={submitButton}>
                    <input id="statusSend" type="radio" name="status" value={res.orderId} />Enviada&nbsp;&nbsp;&nbsp;&nbsp;
                    <input id="statusCancel" type="radio" name="status" value={res.orderId} />Cancelada
                    <button type="submit" >OK</button>
                </form>
            case 'Enviada':
                return <form onSubmit={submitButton}>
                    <input id="statusRecieved" type="radio" name="status" value={res.orderId} onClick={(e) => setStatus(e.target.id)} checked={status === 'statusRecieved'} />Recibida
                    <button type="submit" >OK</button>
                </form>
            default:
                return <p>No se puede cambiar el estado</p>
        }
    }

    let statusInfo = ''

    function statusName(orderState) {
        switch (orderState) {
            case 0:
                return statusInfo = 'Carrito'
            case 1:
                return statusInfo = 'Ingresada'
            case 2:
                return statusInfo = 'Pago aceptado'
            case 3:
                return statusInfo = 'Enviada'
            case 4:
                return statusInfo = 'Recibida'
            case 5:
                return statusInfo = 'Rechazada'
            case 6:
                return statusInfo = 'Cancelada'
            case 7:
                return statusInfo = 'Pendiente'
            default:
                return ''
        }
    }

    useEffect(() => {
        if (orderId) {
            dispatch(GET_ORDER_BY_ID(orderId))
        }
    }, [dispatch, orderId])

    const res = order.obj

    function handleClickSend(status) {
        setOrdId(status)
        dispatch(SEND_STATUS_ORDER(status))
        dispatch(GET_ORDER_BY_ID(status))
    }

    function handleClickRecieve(status) {
        setOrdId(status)
        dispatch(RECIEVE_STATUS_ORDER(status))
        dispatch(GET_ORDER_BY_ID(status))
    }

    function handleClickCancel(status) {
        setOrdId(status)
        dispatch(CANCEL_STATUS_ORDER(status))
        dispatch(GET_ORDER_BY_ID(status))
    }

    function submitButton(event) {
        event.preventDefault()
        switch (status) {
            case 'statusSend':
                handleClickSend(orderId)
                break
            case 'statusCancel':
                handleClickCancel(orderId)
                break
            case 'statusRecieved':
                handleClickRecieve(orderId)
                break
            default:
                break
        }
    }

    return (
        <div className="orders--content__container">
            <div className="orders--title__content">
                <h2>Order detalle</h2>
            </div>
            {
                res ? <div className="orders--details">
                    <div>
                        <p>Este es el detalle de la orden seleccionada: {orderId}</p>
                        <p>La persona: {res.user[0]?.userFirstName} {res.user[0]?.userLastName}</p>
                    </div>
                    <div>
                        <p>Estado actual: {statusName(res.orderState)}</p>
                        <div className="orders--detail__status">
                            <p>Cambiar el estado a: </p>
                            <div className="orders--detail__status__info">
                                {renderOptions(statusInfo)}
                            </div>
                        </div>

                    </div>
                    <div>
                        <p>Compro:</p>
                        {res.cart?.map(elem => {
                            return <section className="orders--details__cart" key={elem._id}>
                                <p className="orders--details__cart__cant">{elem.productCant}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                <p className="orders--details__cart__name">{elem.productName}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                <p className="orders--details__cart__price">${elem.productCant * elem.productPrice}</p>
                            </section>
                        })}
                    </div>
                    <div className="orders--details__final">
                        <p>Por un total de:&nbsp;&nbsp;</p>
                        <p className="orders--details__final__price">${res.orderTotal}</p>
                    </div>
                </div>
                    : ''
            }
        </div>
    )
}