import './App.css';
import socket from './socket'
import React, { useEffect } from 'react'
import reducer from './reducer'

function App() {

  const message = React.createRef()

  let [state,dispath] = React.useReducer(reducer, {
    messages:['message1', 'message2']
  })

  useEffect(() =>{
    
    socket.on('returnMessages', (data) =>{
      dispath({type:'ADD_MESSAGE', message:data})
    })
    
  },[])

  return (
    <div className="App">

      <input ref={message}/>
      <button onClick={() =>{
        socket.emit('sendMesage', message.current.value)
      }}>
        Send
      </button>

      {state.messages.map((m) =>{
        return <p>{m}</p>
      })}
      
    </div>
  );
}

export default App;
