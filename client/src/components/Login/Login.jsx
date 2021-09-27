import axios from 'axios'
import { createRef, useEffect, useState } from 'react'
import style from './Login.module.css'
import {setCookie} from '../Header/Header'
function getCookie(name) {

    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

const Login = (props) =>{

    let password = createRef()
    let Username = createRef()

    let [avatar, setAvatar] = useState()  

    useEffect(() =>{
        if(getCookie('isAuth')){
            props.dispath({type:'SET_IS_AUTH', payload:true})
        }else{
           
            props.dispath({type:'SET_IS_AUTH', payload:false})
        }
    },[])

    return(
        <div className={style.Login}>
            
            <div className={style.Input}>
                <div class="btn-group">
                    <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Аватар
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" onClick={() =>{setAvatar(1)}} href="#"><img src="https://sun9-48.userapi.com/impf/c637720/v637720810/1e32f/8cJN4bmN7ig.jpg?size=2560x1440&quality=96&sign=56ba63d368c5eaf64cd22ebf713647e7&type=album" alt="" /></a>
                        <a class="dropdown-item" onClick={() =>{setAvatar(2)}} href="#"><img src="https://sun9-3.userapi.com/impg/E0sr6HmzwTtB1kUNV96NU-V909HkJXuhambgrg/bFiTIR_9Tyc.jpg?size=1120x1120&quality=96&sign=2784d6f5fbf6d37de897107045706b51&type=album" alt="" /></a>
                        <a class="dropdown-item" onClick={() =>{setAvatar(3)}} href="#"><img src="https://sun9-27.userapi.com/impf/c850232/v850232603/b3b4a/c-ywtYqMj2g.jpg?size=1620x2160&quality=96&sign=3e29dfb622fcf8d0642881500251632f&type=album" alt="" /></a>
                        <a class="dropdown-item" onClick={() =>{setAvatar(4)}} href="#"><img src="https://sun9-71.userapi.com/impg/-YZPOe_uMpYB3O9i2PCaiGhjYWg6pyJb614izw/d8xiogdDiyc.jpg?size=960x1280&quality=96&sign=5c22a9d21bcbcb83857784532e53c777&type=album" alt="" /></a>
                    </div>
                </div>
                <div style={{gap:15 + 'px'}}>
                    <input ref={Username} type="text" className="form-control" placeholder="Введите ваше имя"/>

                    <input ref={password} type="text" className="form-control" placeholder="Введите пароль от чата"/>
                </div>
                <input className="btn btn-primary" onClick={() =>{
                    axios.post('/auth', { password: password.current.value, name: Username.current.value}).then((resp) =>{
                        if(Username.current.value && password.current.value && avatar){
                            if(resp.status === 200){
                                props.dispath({type:'SET_IS_AUTH', payload:true, name: Username.current.value, avatar: avatar})
                                setCookie('avatar',avatar)
                                let name = getCookie('name')
                                props.dispath({type:'SET_IS_AUTH',payload:true, name:name})
                            }else if(resp.status === 201){
                                alert('Введен неверный пароль!')
                            }
                        }else{
                            alert('Не все поля заполненны!')
                        }
                        

                    })
                }} type="button" value="Войти"></input>
            </div>
        </div>
    )
    
}

export default Login