import './App.css';
import socket from './socket'
import React, { createRef, useEffect, useState } from 'react'
import reducer from './reducer'
import axios from 'axios'
import Message from './components/Message/Message';



function App() {

  const styles = ['red', 'blue', 'yellow']
  let [message, setMessage] = useState('')
  const name = createRef()

  
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
      dispath({type:'ADD_MESSAGE', message: data})
    })
    
    
  },[])

  window.state = state
  
  return (
    <div className="App">

     
      <div className='Messages'>
        {state.messages.map((m) =>{ 
          
          return <Message  
          data={m}/>
          
        })}
      </div>
      <div className='wrapInput'>
      <textarea placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} className="Input" />

      <button  onClick={() =>{
        
        socket.emit('sendMesage' , {name: name.current.value, message : message} )
        setMessage('')
      }}>
        Send
      </button>
        <input ref={name} placeholder="name"></input>
      </div>
    </div>
  );
}

export default App;
