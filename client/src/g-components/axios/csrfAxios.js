import axios from "axios";

const csrfAxiosApi = async (link, token, configuration) => {
  const config = configuration || {};
  const cfg = {
    url: process.env.REACT_APP_BACKEND_LINK + "/ProtectedRouteRouter" + link,
    headers: {
      "csrf-token": token,
    },
    method: "POST",
    withCredentials: true,
    ...config,
  };
  const response = { res: {}, err: {} };
  try {
    const data = await axios(cfg);
    response["res"] = data;
  } catch (err) {
    throw err;
  }
  return response;
};

export default csrfAxiosApi;
