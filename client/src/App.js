import './App.css';
import socket from './socket'
import React, { useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'




function App() {

  const message = React.createRef()

  let [state,dispath] = React.useReducer(reducer, {
    messages:[]
  })
  
  useEffect(() =>{
    
    let messages = []

    axios.get('/get_messages').then((resp) =>{
      messages = resp.data
      dispath({type:'SET_MESSAGES', messages})
    })
    
    socket.on('returnMessages', (data) =>{
      dispath({type:'ADD_MESSAGE', message:data})
    })
    
    
  },[])
  window.state = state
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
