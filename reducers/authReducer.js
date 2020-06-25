export default (state={}, action) => {
    switch(action.type){
        case "LOGGED_IN":
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                name: action.name,
                email: action.email,
                image: action.image
            }
        default:
            return state
    }
}