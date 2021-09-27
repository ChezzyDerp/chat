import React, { createRef, useEffect, useState } from 'react'
import reducer from '../../reducer'
import axios from 'axios'
import Message from '../Message/Message';
import socket from '../../socket'
import {CgSmileNoMouth} from 'react-icons/cg'
import Picker from 'emoji-picker-react';

function getCookie(name) {

  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const Chat = (props) =>{

    const styles = ['red', 'blue', 'yellow']
    let [message, setMessage] = useState('')
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const choseEmoj = createRef()
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };


    
    let messages = []
    useEffect(() =>{
        
        
        
        let name = getCookie('name')
        props.dispath({type:'SET_IS_AUTH',payload:true, name:name})

        socket.on('returnMessages', (data) =>{
          props.dispath({type:'ADD_MESSAGE', message: data})
      })

        axios.get('/get_messages').then((resp) =>{
        messages = resp.data
            props.dispath({type:'SET_MESSAGES', messages})
        })
        
       
        

    },[])

    window.state = props.state
  
  return (
    <div className="App">

     
      <div className='Messages'>
        {props.state.messages.map((m) =>{ 
          
          return <Message 
          avatar={m.avatar} 
          data={m} key={1}/>
          
        })}
      </div>
      <div className='pickerWrapper'>
      <Picker   ref={choseEmoj} onEmojiClick={(event, emoji) =>{
        setChosenEmoji(emoji)
        
        setMessage(message + chosenEmoji.emoji)
        }} />
      </div>
      
      <div className='wrapInput'>
        <button className='openSmileMenu' onClick={() =>{
          document.getElementsByClassName('emoji-picker-react')[0].style.visibility == 'visible' ?
          document.getElementsByClassName('emoji-picker-react')[0].style.visibility = 'hidden' :
          document.getElementsByClassName('emoji-picker-react')[0].style.visibility = 'visible' 
        }}  ><CgSmileNoMouth size={50} className='emojiInput'/></button>
        <textarea className="form-control textARR" placeholder="Сообщение" value={message} onChange={(e) => setMessage(e.target.value)}  />

        <button  value='Отправить' class="btn btn-primary"  onClick={() =>{
            if (!message.replace(/\s+/g, ' ').trim()){
              alert('Поле сообщения пусто!')
              setMessage('')
            }else{
              socket.emit('sendMesage' , {name: props.state.name, message : message, avatar: getCookie('avatar')} )
              setMessage('')
            }
          
          }}>
          Отправить
        </button>
          
      </div>
    </div>
  );
}

export {Chat}

