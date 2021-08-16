import React from 'react';

const Connect = ({ connect }) => {
    const [username, setUsername] = useState('');
    return (
      <div className = "panel">
        <input placeholder="Enter your username" value = {username} onChange = {(e) => setUsername(e.target.value)} />
        <button onClick = {() => connect(username)} disabled={!username}>Connect</button>
      
      </div>
    )
  };

  export default Connect;