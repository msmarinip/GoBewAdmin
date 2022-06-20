import axios from "axios";
const { REACT_APP_APIURL } = process.env;

export const userActivateCta = async (userId, hash, userEmail) => {
    // console.log(456)

    try {
        const response = await axios.get(`${REACT_APP_APIURL}users/activate/${userId}/${hash}/${userEmail}`)
        const data = await response.data
        
        console.log(1,data)
        return  {
            ok: data.ok,
            msg: data.msg,
            userId: data.user._id,
            userEmail: data.user.userEmail,
            userFirstName: data.user.userFirstName,
            userLastName: data.user.userLastName
          };
    } catch (error) {
        console.log(error)
    }


}