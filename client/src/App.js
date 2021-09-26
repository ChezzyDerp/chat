import './App.css';
import React from 'react'
import reducer from './reducer'
import {Chat} from './components/Chat/Chat';
import Login from './components/Login/Login';
import Header from './components/Header/Header';


function App() {


  let [state, dispath] = React.useReducer(reducer, {
    messages:[],
    isAuth:false,
    name:null
  })  

  window.state = state
  return(
    <div>

      {state.isAuth 
      ?<div className='wrapChat'><Header state={state} dispath={dispath}/><Chat state={state} dispath={dispath}/></div> 
       : <Login state={state} dispath={dispath}/> }

     
    </div>
  )
}

export default App;
