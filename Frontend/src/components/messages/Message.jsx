// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
// 	const { authUser } = useAuthContext();
// 	const { selectedConversation } = useConversation();
// 	const fromMe = message.senderId === authUser._id;
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className={`chat ${chatClassName}`}> 
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
// 		</div>
// 	);
// };
// export default Message;



import React from 'react'

function Message() {
  return <>
    <div className='chat chat-start ml-4'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='Tailwind CSS chat bubble component' src='./bg.jpg' />
        </div>

        </div>
        <div className='chat-bubble text-white bg-gray-800  pb-2'>Hello, how are you?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:00 PM</div>
    </div>
    <div className='chat chat-end mr-10'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='Tailwind CSS chat bubble component' src='./bg.jpg' />
        </div>

        </div>
        <div className='chat-bubble text-white bg-sky-500 pb-2'>Hello, how are you?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:00 PM</div>
    </div>
  </>
}

export default Message
