import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (window.location.pathname.includes("admin")) {
      if (user.role !== "admin") {
        navigate("/");
      }
    }
    if (window.location.pathname.includes("profile")) {
      if (!user.localId) {
        navigate("/");
      }
    }    
  }, [navigate]);

  return props.children;
}
