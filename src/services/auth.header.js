export default function authHeader() {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    if (user && user.accessToken) {
      return { authorization: user.accessToken };//"Bearer " + 
    } else {
      return {};
    }
  }