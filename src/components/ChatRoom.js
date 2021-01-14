import React from 'react'

const ChatRoom = ({user}) => {
    return (
        <div>
            <h1>{user.displayName}</h1>
        </div>
    )
}

export default ChatRoom
