import React, {useContext} from 'react'
import {UserContext} from "../UserContext"
import '../styles/user-info.css'
import logoutSVG from '../images/logout.svg'

const UserInfo = ({firebase}) => {
    const context = useContext(UserContext);
    return (
        <div className="user-info">
            <img alt="profile" src={context.profile_picture}></img>
            <span>{context.username}</span>
            <button className="logout-button" title="sing out" onClick={() => firebase.auth().signOut()}><img alt="logout" src={logoutSVG}></img></button>
        </div>
    )
}

export default UserInfo
