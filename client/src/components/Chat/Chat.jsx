import React, { createRef, useEffect, useState } from 'react'
import reducer from '../../reducer'
import axios from 'axios'
import Message from '../Message/Message';
import socket from '../../socket'

function getCookie(name) {

  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const Chat = (props) =>{

    const styles = ['red', 'blue', 'yellow']
    let [message, setMessage] = useState('')

    
    
    
    useEffect(() =>{
        
        let messages = []
        let name = getCookie('name')
        props.dispath({type:'SET_IS_AUTH',payload:true, name:name})


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
          data={m} key={1}/>
          
        })}
      </div>
      <div className='wrapInput'>
        <textarea className="form-control textARR" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)}  />

        <input  value='Отправить' class="btn btn-primary"  onClick={() =>{
            if (!message){
              alert('Поле сообщения пусто!')
            }else{
              socket.emit('sendMesage' , {name: props.state.name, message : message} )
              setMessage('')
            }
          
          }}>
          
        </input>
          
      </div>
    </div>
  );
}

export {Chat}

