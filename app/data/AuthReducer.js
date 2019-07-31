const initialState = {
    uid:''
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_USER_ID':
            return action.payload; 
        
        default:
            return state;
    }
}
