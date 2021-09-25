
import style from './Message.module.css'

const Message = (props) =>{
    return (
        <div className={style.Message}>

            <p>{props.data.name}:</p>
            <p >{props.data.message}</p> 


            

        </div>
    )
}

export default Message