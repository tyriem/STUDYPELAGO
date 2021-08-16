import React from 'react';

const CreateChat = ({ createChat, users }) => {
    const [chatName, setChatName] = React.useState('');
    const [recipient, setRecipient] = React.useState(users[0]);;

    
    return (
      <div className = "panel">
       <h3>Create A Chat</h3>
       <p>Enter a name and select a recipient for your chat:</p>
       <input onChange={(e) => setChatName(e.target.value)} value={chatName} placeholder="Enter a name for your chat!" />
       <select onChange={(e) => setRecipient(e.target.value)}>
       {users.map(user => ( <option value ={user}>
         {user}
       </option>
       ))}
       </select>
       <p>Create chat with name {chatName} and recepient: {recipient} ?</p>
       <button onClick={() => createChat(recipient, chatName)} disabled={!chatName || !recipient}>Submit</button>
      </div>
    )
  };

  export default CreateChat;