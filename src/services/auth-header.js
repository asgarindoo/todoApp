import Cookies from "js-cookie";

export default function authHeader() {
  let user = Cookies.getJSON("user");

  if (user && user.token) { 
    return { Authorization: `Bearer ${user.token}` }; 
  } else {
    return {};
  }
}
