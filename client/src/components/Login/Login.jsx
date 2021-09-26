import axios from 'axios'
import { createRef, useEffect } from 'react'
import style from './Login.module.css'

function getCookie(name) {

    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

const Login = (props) =>{

    let password = createRef()
    let Username = createRef()
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
                <div style={{gap:15 + 'px'}}>
                    <input ref={Username} type="text" className="form-control" placeholder="Введите ваше имя"/>
                    
                    <input ref={password} type="text" className="form-control" placeholder="Введите пароль от чата"/>
                </div>
                <input className="btn btn-primary" onClick={() =>{
                    axios.post('/auth', { password: password.current.value, name: Username.current.value}).then((resp) =>{
                        if(Username.current.value && password){
                            if(resp.status === 200){
                                props.dispath({type:'SET_IS_AUTH', payload:true, name: Username.current.value})
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