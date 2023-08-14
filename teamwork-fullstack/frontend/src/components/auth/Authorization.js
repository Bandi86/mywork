import { useEffect, useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { verifySessionEndpoint } from "../../repositories/apiEndPoints";
import { createEntry } from "../../repositories/crud";
import useLogout from "../../hooks/useLogout";

export default function Auth(props) {
  const { user, setUser, isloggedin, setIsLoggedIn } = useContext(userContext);
  const [cookies] = useCookies(["sessionID"]);

  const logoutHandler = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    verifySession();
    userCheck();
  }, [cookies?.sessionID]);

  const handleSuccessfulLogin = (resBody) => {
    localStorage.setItem("user", JSON.stringify(resBody));
    setUser(resBody);
    setIsLoggedIn(true);
  };

  const handleFailedLogin = () => {
    logoutHandler();
  };

  function userCheck() {
    if (window.location.pathname.includes("admin") && user?.role !== "admin") {
     
      navigate("/");
    }
  }

  const verifySession = async () => {
    try {
      if (cookies?.sessionID && !isloggedin) {
        const resp = await createEntry(
          { sessionID: cookies.sessionID },
          verifySessionEndpoint
        );

        if (resp.ok) {
          const resBody = await resp.json();
          if (resBody) {
            handleSuccessfulLogin(resBody);
          } else {
            handleFailedLogin();
          }
        } else {
          handleFailedLogin();
        }
      } else {
        handleFailedLogin();
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
      handleFailedLogin();
    }
  };
  return props.children;
}
