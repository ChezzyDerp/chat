

const reducer = (state, action) =>{
    switch (action.type){
        case ('ADD_MESSAGE'):
            return {...state, messages: [...state.messages, action.message] }

        default:
            return state
    }   
}


export default reducer
