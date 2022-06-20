import { useDispatch } from "react-redux";
import { GET_FAQS, POST_FAQS } from "../../../redux/actions";
import FaqCardContainer from "./FaqCardContainer";
import { Form, Formik } from 'formik'
import { TextInput } from '../../form/TextInput'
import * as Yup from 'yup';
import '../../../scss/_faqForm.scss';

export default function CreationFaq() {

    const dispatch = useDispatch();
    const initialValues = {
        faqTitle: '',
        faqDescription: '',
        faqOrder: ''
    }

    const validations = Yup.object().shape({
        faqTitle: Yup.string()
            .required('Requerido.'),
        faqDescription: Yup.string(),
        faqOrder: Yup.number()
    });

    return (
        <div className="faq--content__container">
            <div className="faq--title__container">
                <h1>Crea tus FAQ</h1>
                <h3>Frequently Asked Questions (Preguntas mas frecuentes)</h3>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    dispatch(POST_FAQS(values))
                    alert("FAQ creada correctamente")
                    dispatch(GET_FAQS())
                }
                }
                validationSchema={validations}
            >
                {
                    (formik) => (
                        <Form className='faq--form__container'>
                            <TextInput className='field-faq__form' name='faqTitle' type='text' placeholder='Pregunta...' />
                            <TextInput className='field-faq__form' name='faqDescription' type='text' placeholder='Descripcion...' />
                            <TextInput className='field-faq__form' name='faqOrder' type='text' placeholder='Orden...' />
                            <button type='submit'>Crear</button>
                        </Form>
                    )
                }
            </Formik>
            <div>
                <FaqCardContainer />
            </div>
        </div>
    )
}
