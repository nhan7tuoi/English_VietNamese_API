const initialState = {
    id: "",
    username: "",
    password: "",
    english: [],
    vietnamese: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                id: action.user.id,
                username: action.user.username,
                password: action.user.password,
                english: action.user.english,
                vietnamese: action.user.vietnamese
            };
        case "ADD_VOCABULARY":
            return {
                ...state,
                english: [...state.english, { id: state.english.length + 1, content: action.english }],
                vietnamese: [...state.vietnamese, {id: state.vietnamese.length + 1, content: action.vietnamese}]
            };
        case "DELETE_VOCABULARY":
                const updatedEnglish = state.english.slice(0, action.id).concat(state.english.slice(action.id + 1));
                const updatedVietnamese = state.vietnamese.slice(0, action.id).concat(state.vietnamese.slice(action.id + 1));
                return {
                  ...state,
                  english: updatedEnglish,
                  vietnamese: updatedVietnamese,
                };
                case "UPDATE_VOCABULARY":
                    return {
                      ...state,
                      english: state.english.map(item => {
                        if (item.id === action.id) {
                          return { ...item, content: action.updatedContent };
                        }
                        return item;
                      }),
                      vietnamese: state.vietnamese.map(item => {
                        if (item.id === action.id) {
                          return { ...item, content: action.updatedTranslation };
                        }
                        return item;
                      }),
                    };
        default:
            return state;
    }
}

export default reducer;