// import { RiPencilFill } from 'react-icons/ri'
// import { MdDoNotDisturbOn } from 'react-icons/md'
// import { ImCheckboxChecked } from 'react-icons/im'
// import { useState } from 'react'
// import { useEffect } from 'react'

export default function TableOrders({ orderId, userFirstName, userLastName, dates, setOrdId, totalPrice, statusOrder }) {

    function handleClickDetail(event) {
        setOrdId(event.target.value)
    }
    var date = new Date(dates);
    const formatDate = (date) => {
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return formatted_date;
    }

    return (
        <tr>
            <td className='field--date'>{formatDate(date)}</td>
            <td className='field--idOrder'>{orderId}</td>
            <td className='field--userFirstName'>{userFirstName}</td>
            <td className='field--userLastName'>{userLastName}</td>
            <td className='field--totalPrice'>$ {totalPrice}</td>
            {/* <td className='field--order__send'><input type="checkbox" value={statusOrder} onClick={handleClickStatus} name="sendOrder" disabled={!readySent} /></td>
            <td className='field--order__recieve'><input type="checkbox" value={statusOrder} onClick={handleClickStatus} name='recieveOrder' disabled={!readyRecieve} /></td>
            <td className='field--order__cancel'><input type="checkbox" value={'cancelad'} onClick={handleClickStatus} name='cancelOrder' disabled={!readyCancel} /></td> */}
            <td className='field--buttonDetail'><button onClick={handleClickDetail} value={orderId} >Detail</button></td>
        </tr>
    )
}