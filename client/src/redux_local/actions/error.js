class errorAction {
  setError(error) {
    return { type: "SET_CUSTOM_ERROR", error: error };
  }
}
export default new errorAction();
