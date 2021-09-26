import style from './Header.module.css'

function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }


const Header = (props) =>{
    return(
        <nav className={`navbar navbar-light bg-light ${style.Header}`} >
            
            <a className="navbar-brand">DUZCHAT</a>
            <form className="form-inline">
            <input className="btn btn-primary" type="button" value="Выйти" onClick={() =>{
                  deleteCookie('name')
                  deleteCookie('isAuth')
                  props.dispath({type:'SET_IS_AUTH', payload:false, name:null})
              }}></input>
            </form>
        </nav>
       
    )
}

export default Header