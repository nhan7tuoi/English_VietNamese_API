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
      const maxEnglishId = Math.max(...state.english.map(item => item.id), 0);
      const maxVietnameseId = Math.max(...state.vietnamese.map(item => item.id), 0);
      const newId = Math.max(maxEnglishId, maxVietnameseId) + 1;
      return {
        ...state,
        english: [...state.english, { id: newId, content: action.english }],
        vietnamese: [...state.vietnamese, { id: newId, content: action.vietnamese }]
      };
    case "DELETE_VOCABULARY":
      let index = action.id;
      console.log('index', index);
      const updatedEnglish = state.english.filter(item => item.id !== action.id);
      const updatedVietnamese = state.vietnamese.filter(item => item.id !== action.id);
      console.log('updatedEnglish', updatedEnglish);
      console.log('updatedVietnamese', updatedVietnamese);
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