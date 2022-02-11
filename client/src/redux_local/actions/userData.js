class userProfileAction {
  changeUserData(params) {
    return { type: "CHANGE_USER_DATA" };
  }
  setUserData(state) {
    return {
      type: "FETCH_DATA",
      data: {
        data: state,
      },
    };
  }
}

export default new userProfileAction();
