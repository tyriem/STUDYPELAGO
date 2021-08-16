import React from 'react';

const ChatWindow = ({ messages = [], sendMessage, currentChat }) => {
  const [messageBody, setMessageBody] = React.useState('');

  //Sort messages into descending order by the date they were created
  const sortedMessages = messages.sort((a, b) => new Date(a.created).valueOf() - new Date(b.created).valueOf());
  
   
    return (
      <div className = "panel">
        <div className="messages">
          {sortedMessages.map(message => (
            <p>{message.sender} : {message.body}</p>
          ))}
        </div>
        <div className="send-message">
          <textarea value={messageBody} onChange={e => setMessageBody(e.target.value)} className="text-entry" />
          <button className="submit" onClick={() => sendMessage(currentChat, messageBody)}>Submit</button>
        </div>
      </div>
    )
  };

  export default ChatWindow;