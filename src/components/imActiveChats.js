import React from 'react';

const ActiveChats = ({ myActiveChats, setCurrentChat }) => (
<div className="panel">
<h3> Select an Active Chat</h3>
{myActiveChats.map(chat => (
  <div onClick={() => setCurrentChat(chat)}>{chat}</div>
))}
</div>
);
  export default ActiveChats;