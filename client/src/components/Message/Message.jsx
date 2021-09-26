
import style from './Message.module.css'

const Message = (props) =>{
    return (
        <div className={style.Message}>
            <div>
            <p className={style.name}>{props.data.name}:</p>
            <p className={style.message}>{props.data.message}</p> 
            </div>
            


            

        </div>
    )
}

export default Message