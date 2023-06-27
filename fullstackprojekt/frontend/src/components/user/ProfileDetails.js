import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function ProfileDetails() {
  const { localId } = useParams();
  
  const [user] = useContext(UserContext);
    

  const currentUser = user.localId === localId ? user : null; 

  return (
    <div>
      {currentUser && (
        <div>
          <h2>Szia {currentUser.name}</h2>          
        </div>
      )}
    </div>
  );
}


