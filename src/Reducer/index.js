const INITIAL_STATE = {
    user: ""
}


export const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CHANGE_USER":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state

    }
}




