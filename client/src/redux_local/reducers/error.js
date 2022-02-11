const initialState = {
  msg: "EveryThing is working Fine",
  status: 200,
};

class errorReducerClass {
  constructor(state, action) {
    this.state = state;
    this.action = action;
  }
  authError(error) {
    switch (error.response.status) {
      case 500:
        this.state.msg =
          "something wrong happened . Please try after Some time";
        this.state.status = 500;
        break;
      case 401:
        this.state.msg = "please re-login";
        this.state.status = 401;
        break;
      default:
        this.state.msg =
          "something wrong happened . Please try after Some time";
        this.state.status = 400;
        break;
    }
  }
  reducerResponse() {
    // response
    switch (this.action.type) {
      case "SET_CUSTOM_ERROR":
        this.authError(this.action.error);
        break;

      default:
        break;
    }

    return this.state;
  }
}
const reducerFunction = (state = initialState, action) => {
  return new errorReducerClass(state, action).reducerResponse();
};
const errorReducer = reducerFunction;
export default errorReducer;
export { errorReducerClass };
