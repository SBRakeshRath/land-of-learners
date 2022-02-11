import csrfAxiosApi from "g-components/axios/csrfAxios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "firebase";
import userProfileAction from "redux_local/actions/userData.js";
import error_redux from "redux_local/actions/error";
class userProfileData {
  constructor() {
    this.name = "unknown";
    this.bio = "I am very good at my job. ";
    this.profilePhoto = "https://picsum.photos/200";
    this.dob = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
    this.loading = true;
    this.email = "example@example.com";
    this.email_verified = false;
    this.phoneNo = "1234567890";
    this.phoneNo_verified = false;
    this.token = false;
    this.additional = {};
  }
  fetchStepData(csrfToken, bool) {
    return (dispatch) => {
      this.disPatchData(dispatch);

      (async () => {
        try {
          const res = await csrfAxiosApi(
            "/tokenProtected/stepToken",
            csrfToken,
            {}
          );
          const data = res.res.data;
          this.token = data.token;
          await signInWithCustomToken(auth, data.token);
          const ud = await auth.currentUser.getIdTokenResult();
          this.name = ud.claims.name;
          this.email = ud.claims.email;
          this.email_verified = ud.claims.email_verified;
          this.additional = {
            type: ud.claims.type,
            step: ud.claims.step,
          };
          this.loading = false;
          this.disPatchData(dispatch);
        } catch (error) {
          this.loading = false;
          dispatch(error_redux.setError(error));
        }
      })();
    };
  }
  disPatchData(dispatch) {
    const profileData = {
      name: this.name,
      bio: this.bio,
      profilePhoto: this.profilePhoto,
      dob: this.dob,
      loading: this.loading,
      email: this.email,
      token: this.token,
      email_verified: this.email_verified,
      phoneNo: this.phoneNo,
      phoneNo_verified: this.phoneNo_verified,
      additional: this.additional,
    };
    dispatch(userProfileAction.setUserData(profileData));
  }
}

export default new userProfileData();
