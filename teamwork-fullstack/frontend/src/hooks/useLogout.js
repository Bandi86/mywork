import { useNavigate } from "react-router-dom";
import logout from "../services/logout";
import { userContext } from "../contexts/userContext";
import { useContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useLogout() {
  const { user, setUser, setIsLoggedIn } = useContext(userContext);
  const navigate = useNavigate();
  return () => {
    logout().then(() => {
      localStorage.removeItem('user');
      setUser({});
      setIsLoggedIn(false);
      navigate("/");
      toast.success("Logout successful", {
        position: toast.POSITION.TOP_RIGHT
      });
    });
  };
}
