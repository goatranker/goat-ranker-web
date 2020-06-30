import React, { useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext.js"
import Axios from 'axios'

const Account = (props) => {
    const { userData, setUserData } = useContext(UserContext)   
    const [userPull, setUserPull] = useState(null)
    const history = useHistory()
    
    
    const getUser = async (user) => {
        console.log('token', user.token);
        try {
            const req = await Axios({
                url: "http://localhost:8000/users/account",
                method: 'GET',
                data: {"user_id": `${user.user.id}`},
                headers: {"x-auth-token": `${user.token}`},
            })
            setUserPull(req)
        } catch (error) {
            console.log(error);
        }
    }    
    useEffect(() => {
        console.log(userData);
        
        getUser(userData)
        userData.user? getUser(userData) : history.push('users/login')
    }, [])         

    const cheese = () => {
        console.log(userPull);
    }

    return(
        <div className="account-container">
            {userData.user && userPull? 
                    <> 
                    <br/>
                    <br/>
                    <h1 onClick={cheese}>Hello, {userData.user.username}!</h1>

                    </>
                    : 
                    <> 
                    <br/>
                    <br/>
                    <h1>Not Logged in</h1>
                    </>
            }
        </div>
        
    )
}

export default Account;