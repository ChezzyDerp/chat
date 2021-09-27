
import style from './Message.module.css'

const Message = (props) =>{
    console.log(props)
    return (
        <div className={style.Message}>
            <div>
                <img src={props.avatar == 1 ? 
                'https://sun9-48.userapi.com/impf/c637720/v637720810/1e32f/8cJN4bmN7ig.jpg?size=2560x1440&quality=96&sign=56ba63d368c5eaf64cd22ebf713647e7&type=album'
                :props.avatar == 2 ? 'https://sun9-3.userapi.com/impg/E0sr6HmzwTtB1kUNV96NU-V909HkJXuhambgrg/bFiTIR_9Tyc.jpg?size=1120x1120&quality=96&sign=2784d6f5fbf6d37de897107045706b51&type=album'
                :props.avatar == 3 ? 'https://sun9-27.userapi.com/impf/c850232/v850232603/b3b4a/c-ywtYqMj2g.jpg?size=1620x2160&quality=96&sign=3e29dfb622fcf8d0642881500251632f&type=album'
                :props.avatar == 4 ? 'https://sun9-71.userapi.com/impg/-YZPOe_uMpYB3O9i2PCaiGhjYWg6pyJb614izw/d8xiogdDiyc.jpg?size=960x1280&quality=96&sign=5c22a9d21bcbcb83857784532e53c777&type=album'
                : null} alt="" />
            <p className={style.name}>{props.data.name}:</p>
            <p className={style.message}>{props.data.message}</p> 
            </div>
            


            

        </div>
    )
}

export default Message