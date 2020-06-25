// export const loggedIn = (userId, token, name, email, image) =>{
//     return async dispatch => {
//         dispatch({
            // type: "LOGGED_IN",
            // userId: userId,
            // token: token,
            // name: name,
            // email: email,
            // image: image
//         })
//     }
// }

export function loggedIn(userId, token, name, email, image){
    return {
        type: "LOGGED_IN",
        userId: userId,
        token: token,
        name: name,
        email: email,
        image: image
    }
} 