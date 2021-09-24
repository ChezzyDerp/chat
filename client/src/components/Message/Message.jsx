
import style from './Message.module.css'

const Message = (props) =>{
    return (
        <div className={style.Message}>


            <p >{props.message}</p> 



            

        </div>
    )
}

export default Message