const initialState={
    signUpSuccess:false,
    loginSuccess:JSON.parse(localStorage.getItem("albumLogin")),
    photos:[]
}

const LoginReducer=(state=initialState,action)=>{
    
     switch(action.type){
         case "signupstatus":
            return {...state,signUpSuccess:!state.signUpSuccess}
            case "loginstatus":
                return {...state,loginSuccess:!state.loginSuccess}
                case "logout":
                    return{...state,loginSuccess:!state.loginSuccess}
                    case "showalbum":
                        return {...state,photos:action.payload}

         default:return state
     }
}

export default LoginReducer;