const reducer = (state, action) => {
  switch (action.type) {
    case "get":
      return { words: action.words };
    case "create":
      return { words: [action.word, ...state.words] };
    case "delete":
      return { words: state.words.filter((word) => word.id !== action.id) };
    case "update":
      return {
        words: state.words.map((word) => {
          if (word.id === action.word.id) {
            return action.word;
          }
          return word;
        }),
      };
    case "master":
      return {
        words: state.words.map((word) => {
          if (word.id === action.id) {
            word.master = true;
            return word;
          }
          return word;
        }),
      };
    default:
      throw new Error();
  }
};

export default reducer;
