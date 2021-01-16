import React, {useContext} from 'react'
import {UserContext} from "../UserContext"
import '../styles/user-info.css'

const UserInfo = () => {
    const context = useContext(UserContext);
    return (
        <div className="user-info">
            <img alt="profile" src={context.profile_picture}></img>
            <span>{context.username}</span>
        </div>
    )
}

export default UserInfo
