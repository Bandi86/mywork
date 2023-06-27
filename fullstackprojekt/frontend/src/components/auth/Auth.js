import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);

 /*  useEffect(() => {
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []); */

  return props.children;
}
