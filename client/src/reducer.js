

const reducer = (state, action) =>{
    switch (action.type){
        case ('SET_MESSAGES'):
            return {...state, messages: action.messages }
        case ('ADD_MESSAGE'):
            return {...state, messages: [...state.messages, action.message] }

        case ('SET_IS_AUTH'):
            return {...state, isAuth: action.payload}

        default:
            return state
        
        
    }   

    return state
}


export default reducer
