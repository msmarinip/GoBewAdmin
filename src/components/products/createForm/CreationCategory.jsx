import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CREATE_CATEGORY, GET_CATEGORIES_ADMIN } from "../../../redux/actions";

export default function CreationCategory() {

    const categories = useSelector((state) => state.adminReducer.categories)

    let dispatch = useDispatch()
    const [error, setError] = useState('');

    const [newCateg, setNewCateg] = useState({
        categoryName: '',
        categoryActive: true,
        categorySupId: null
    });

    function handleSelectCategory(event) {
        setNewCateg({
            ...newCateg,
            categorySupId: event.target.value
        })
    }

    function handleChangeCategory(event) {
        setNewCateg((prevState) => {
            const newState = {
                ...prevState,
                [event.target.name]: event.target.value
            };
            setError('')
            return newState;
        })
    }

    function handleCreateCategory(event) {
        if (newCateg.categoryName.length === 0) {
            setError(1);
            alert('Error: Ingresa el nombre de la categoria')
        } else if (Object.keys(error).length === 0) {
            dispatch(CREATE_CATEGORY(newCateg))
            alert('Categoria creada')
        }
        console.log(newCateg)
        setNewCateg({
            categoryNew: '',
            categoryActive: true,
            categorySupId: null
        })
    }

    useEffect(() => {
        dispatch(GET_CATEGORIES_ADMIN());
    }, [dispatch])

    return <form onSubmit={(e) => handleCreateCategory(e)}>
        <div>
            <label> Crear categoria: </label>
            <input type="text" placeholder="Categoria..." onChange={(e) => handleChangeCategory(e)} value={newCateg.categoryName} name='categoryName' />
            <br />
            <span>Para crear una categoria principal, no seleccionar categoria padre</span>
            <span>{error.newProductCategory || ''}</span>
        </div>
        <div>
            <label>Categoria padre: </label>
            <select onChange={(e) => handleSelectCategory(e)}>
                <option value="">Selecciona categoria</option>
                {categories?.map((categ) => {
                    return <option key={categ._id} value={categ._id}>{categ.categoryName}</option>
                })}
            </select>
        </div>
        <div>
            <label>Activo: </label>
            <input type="radio" onClick={(e) => handleChangeCategory(e)} value={true} name='categoryActive' /> Si
            <input type="radio" onClick={(e) => handleChangeCategory(e)} value={false} name='categoryActive' /> No
            <span>{error.productIsActive}</span>
        </div>
        <div>
            <button type="submit">Crear</button>
        </div>
    </form>
}