import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useCookies } from "react-cookie";

export default function Auth(props) {
  const [user] = useContext(UserContext);
  const [cookies, setCookie, clearCookie] = useCookies();
  console.log(user);

  // useEffect(() => {
  // if (cookies.sessionID) {
  //   if (user.role === "admin") {
  //     return <Navigate to="/admin" />;
  //   } else {
  //     return <Navigate to="/" />;
  //   }
  // } else {
  //   clearCookie("sessionID");
  // }
  // }, [user]);

  // if (!user.email) return <Navigate to="/login" />;
  // return props.children;
  return props.children;
}
