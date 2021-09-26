import React, { createRef, useEffect, useState } from 'react'
import reducer from '../../reducer'
import axios from 'axios'
import Message from '../Message/Message';
import socket from '../../socket'



const Chat = (props) =>{

    const styles = ['red', 'blue', 'yellow']
    let [message, setMessage] = useState('')
    const name = createRef()

  
    
    
    useEffect(() =>{
        
        let messages = []

        axios.get('/get_messages').then((resp) =>{
        messages = resp.data
            props.dispath({type:'SET_MESSAGES', messages})
        })
        
        socket.on('returnMessages', (data) =>{
            props.dispath({type:'ADD_MESSAGE', message: data})
        })
        
        
    },[])

    window.state = props.state
  
  return (
    <div className="App">

     
      <div className='Messages'>
        {props.state.messages.map((m) =>{ 
          
          return <Message  
          data={m}/>
          
        })}
      </div>
      <div className='wrapInput'>
      <textarea class="form-control textARR" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} className="Input" />

      <input  value='Отправить' class="btn btn-primary BtnSend"  onClick={() =>{
        if (!name.current.value || !message){
          alert('Одно из полей не заполненно!')
        }else{
          socket.emit('sendMesage' , {name: name.current.value, message : message} )
          setMessage('')
        }
       
      }}>
        
      </input>
        <input className="form-control nameForm"  ref={name} placeholder="name"></input>
      </div>
    </div>
  );
}

export {Chat}

