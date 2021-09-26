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
                <input ref={password} type="text" class="form-control" placeholder="Введите пароль от чата"/>
                <input class="btn btn-primary" onClick={() =>{
                    axios.post('/auth', { password: password.current.value}).then((resp) =>{
                        
                        if(resp.status === 200){
                            props.dispath({type:'SET_IS_AUTH', payload:true})
                        }else if(resp.status === 201){
                            alert('Введен неверный пароль!')
                        }

                    })
                }} type="button" value="Войти"></input>
            </div>
        </div>
    )
    
}

export default Login