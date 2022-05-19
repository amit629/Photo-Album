const initialState={
    signUpSuccess:false,
    loginSuccess:false
}

const Reducer=(state=initialState,action)=>{
    
     switch(action.type){
         case "signupstatus":
            return {...state,signUpSuccess:!state.signUpSuccess}
            case "loginstatus":
                return {...state,loginSuccess:!state.loginSuccess}
                case "logout":
                    return{...state,loginSuccess:!state.loginSuccess}

         default:return state
     }
}

export default Reducer;