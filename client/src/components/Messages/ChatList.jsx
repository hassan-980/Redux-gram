import React from 'react'

function ChatList() {
  return (
      <div className="w-1/4 border-r p-4 overflow-auto">
      <button className="w-full py-2 bg-blue-500 text-white rounded mb-2">+ New Chat / Group</button>
      {/* {chats.map(chat => (
        <div
          key={chat._id}
          onClick={() => dispatch(setCurrentChat(chat))}
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          {chat.isGroup ? chat.chatName : chat.users.find(u => u._id !== chat.me)._id}
        </div>
      ))} */}
    </div>
  )
}

export default ChatList