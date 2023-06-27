import { UserContext } from "../../contexts/UserContext.js";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const logoutAPI = "http://localhost:8000/logout";

export default function Logout() {
  const [user, setUser] = useContext(UserContext);
  const [cookies, , removeCookie] = useCookies();

  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch(`${logoutAPI}/${cookies.sessionID}`);

        const data = await response.json();
        if (data.success) {
          setUser({});
          removeCookie("sessionID");
          navigate("/");
          alert("Logout successful");
        } else {
          alert("Logout failed");
        }
      } catch (error) {
        console.log("Logout failed", error);
      }
    };

    logoutUser();
  }, [cookies.sessionID]);

  return null;
}
