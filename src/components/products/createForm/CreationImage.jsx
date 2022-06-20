const { REACT_APP_CLOUDINARY_RES, REACT_APP_APIURL } = process.env;

// import { useParams } from "react-router-dom";


export default function CreationImage({ setImg, setPrimaryPic, img }) {

    function handleDeleteImg(e) {
        console.log(img, e.target.name);

        let res = img.filter(pic => pic._id !== e.target.name)
        console.log(res)
        if (res instanceof File) {
            setImg(res)
            return
        } else {
            setImg(res)
            fetch(`${REACT_APP_APIURL}images/${e.target.name}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(res => { console.log(res) })
                .catch(err => console.log(err))
        }
    }
    function handlePrimary(e) {
        setPrimaryPic(e.target.name)
    }

    return (
        <>
            <div className="img-label">
                <label>Imagen: </label>
                <label htmlFor="img-btn" className={"img-btn-label"}>Selecciona las imágenes</label>
                <input disabled={img && (img?.length == 3)} className="img-btn-input" type="file" id="img-btn" onChange={(e) => {
                    setImg([...img, e.target.files[0]]);
                }} />
            </div>
            <div className="img-container">
                {
                    img && img?.map(pic => {
                        let imageSources
                        if (pic instanceof File) {
                            imageSources = URL.createObjectURL(pic)
                        } else {
                            let truncatedName = pic.imageName.slice(1, pic.imageName.length)
                            imageSources = `${REACT_APP_CLOUDINARY_RES}${truncatedName}`
                        }
                        return <div className="img-try">
                            <button type="button" key={pic?.name} name={pic?._id} onClick={(e) => handleDeleteImg(e)}>X</button>
                            <img src={imageSources} alt={pic?.name} />
                            <div>
                                <input type="radio" id={pic?.name} name={pic?.name} onClick={(e) => handlePrimary(e)} />
                                <label htmlFor={pic?.name}>Imagen principal</label>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}