import './App.css';
import socket from './socket'
import React, { createRef, useEffect, useState } from 'react'
import reducer from './reducer'
import axios from 'axios'
import Message from './components/Message/Message';
import {Chat} from './components/Chat/Chat';
import {state} from './components/Chat/Chat'
import Login from './components/Login/Login';


function App() {


  let [state, dispath] = React.useReducer(reducer, {
    messages:[],
    isAuth:false
  })  

  window.state = state
  return(
    <div>

      {state.isAuth ? <Chat state={state} dispath={dispath}/> : <Login state={state} dispath={dispath}/> }

     
    </div>
  )
}

export default App;
