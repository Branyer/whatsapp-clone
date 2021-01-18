import React, {useContext} from 'react'
import '../styles/chat-preview.css'
import {UserContext} from '../UserContext'

const ChatPreview = ({chatId, avatar, last_message, username, onClick}) => {

    const { firebase } = useContext(UserContext);

    
    //TODO conectar con mensajes
    //   firebase.database().ref(`chats/${chatId}/messages`).on('child_added', (data) => {

    //     console.log(data.val());

    //   });

    return (
        <li className="chat-preview" onClick={onClick}>
            <img alt={username} src={avatar}></img>
            <div>
                <span>{username}</span>
                <span>{last_message}</span>
            </div>
        </li>
    )
}

export default ChatPreview
