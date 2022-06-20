import { useEffect, useState } from "react"
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom"
import { useCallback } from "react";

const { REACT_APP_APIURL } = process.env;

export const Activate = () => {
  const { userId, hash, userEmail } = useParams();
  const navigate = useNavigate();
    
    
    const [res, setRes] = useState({
      ok: false,
      msg: '123',
      userId,
      userEmail,
      userFirstName: '',
      userLastName: ''
    })

  // const userActivateCta = async (userId, hash, userEmail) => {
  //       try {
  //           const response = await axios.get(`${REACT_APP_APIURL}users/activate/${userId}/${hash}/${userEmail}`)
  //           const data = await response.data
            
  //           setRes(  {
  //               ok: data.ok,
  //               msg: data.msg,
  //               userId: data.user._id,
  //               userEmail: data.user.userEmail,
  //               userFirstName: data.user.userFirstName,
  //               userLastName: data.user.userLastName
  //             });
  //       } catch (error) {
  //           setRes({...res, ok:"noOk"})
  //       }
    
    
  //   }    

const cbUserActivateCta = useCallback(
  async () => {
      try {
        const response = await axios.get(`${REACT_APP_APIURL}users/activate/${userId}/${hash}/${userEmail}`);
        const data = response.data;
        
        setRes(  {
            ok: data.ok,
            msg: data.msg,
            userId: data.user._id,
            userEmail: data.user.userEmail,
            userFirstName: data.user.userFirstName,
            userLastName: data.user.userLastName
          });
    } catch (error) {
        setRes({...res, ok:"noOk"})
    }
  },
  [userId, hash, userEmail, res],
)


  
useEffect( () => {
  cbUserActivateCta()
  // userActivateCta(userId, hash, userEmail)
  // console.log(res)
},[cbUserActivateCta])

useEffect(() => {
  localStorage.setItem('lastPath', '/')
  res?.ok === true  && navigate('/login?validate=ok', {replace: true})
  
}, [res, navigate])


  return (
    <>
    <p>{res?.ok ==='noOk' && <div>La cuenta {res.userEmail} no pudo ser activada. </div>}</p>
    {res?.ok === true && <div>La cuenta se activó con éxito.</div>}
    </>
  )
}
