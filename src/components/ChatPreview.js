import React from 'react'
import '../styles/chat-preview.css'


const ChatPreview = ({avatar, last_message, username}) => {
    return (
        <li className="chat-preview">
            <img alt={username} src={avatar}></img>
            <div>
                <span>{username}</span>
                <span>{last_message}</span>
            </div>
        </li>
    )
}

export default ChatPreview
