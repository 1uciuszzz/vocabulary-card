const reducer = (state, action) => {
  switch (action.type) {
    case "index":
      return {
        ...state,
        currIndex: action.index,
      };
    case "next":
      return {
        ...state,
        currIndex: (state.currIndex + 1) % state.words.length,
      };
    case "loading":
      return { ...state, loading: true };
    case "loaded":
      return { ...state, loading: false };
    case "get":
      return {
        ...state,
        words: action.words,
      };
    case "create":
      return {
        ...state,
        words: [action.word, ...state.words],
      };
    case "delete":
      return {
        ...state,
        words: state.words.filter((word) => word.id !== action.id),
      };
    case "update":
      return {
        ...state,
        words: state.words.map((word) => {
          if (word.id === action.word.id) {
            return action.word;
          }
          return word;
        }),
      };
    case "master":
      return {
        ...state,
        words: state.words.map((word) => {
          if (word.id === action.id) {
            word.mastered = true;
            return word;
          }
          return word;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
