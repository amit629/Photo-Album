const initialState={
    photos:[]
}
const AlbumReducer=(state=initialState,action)=>{
    switch(action.type){
        case "showalbum":
            return {...state,photos:action.payload}
            default:return new Error()
    }

}

export default AlbumReducer;