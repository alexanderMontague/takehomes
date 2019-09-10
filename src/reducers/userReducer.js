const initialState = {
  test: null
};

const userReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case "TEST":
      return {
        ...prevState,
        test: true
      };

    default:
      return prevState;
  }
};

export default userReducer;
