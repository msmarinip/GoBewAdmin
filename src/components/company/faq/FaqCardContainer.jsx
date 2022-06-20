import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_FAQS } from "../../../redux/actions";
import FaqsCreated from "./FaqsCreated";
import '../../../scss/_faqAdmin.scss'

export default function FaqCardContainer() {

    const faqs = useSelector((store) => store.adminReducer);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_FAQS())
    }, [dispatch])

    return <div>
        {faqs.faqs ?
            <FaqsCreated faqsCreated={faqs.faqs?.faqList} />
            : <h2>No hay FAQ creadas</h2>
        }
    </div>
}