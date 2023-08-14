import React from "react";
import { Avatar } from "flowbite-react";
import convertDate from "../../services/timestamp";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";

const UserAvatar = () => {
  const { profileData, setProfileData, user } = useContext(userContext);
  const [convertedDate, setConvertedDate] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const imageUrl = "http://localhost:8080/";

  useEffect(() => {
    try {
      setConvertedDate({
        created: convertDate(profileData[0].userCreatedAt),
        updated: convertDate(profileData[0].userUpdatedAt),
      });
      setImagePath(imageUrl + profileData[0].imagePath.replace(/\\/g, "/"));
    } catch (err) {}
    try {
      setUserName(profileData[0].userName);
      setUserEmail(profileData[0].userEmail);
    } catch (err) {}
  }, [profileData]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const photoIcon = (
    <MdAddAPhoto className="text-4xl absolute bottom-0 left-[5.7rem] top-16 m-2 border-2 border-second p-[0.3rem] rounded-full text-first" />
  );

  return (
    <div className="flex flex-col items-center space-x-4 mt-4 relative">
      <Link to={`/profile/${user.localId}/avatar`}>
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar
            img={imagePath}
            rounded
            bordered
            size="xl"
            className="mx-auto mb-4 w-32 rounded-lg cursor-pointer hover:"
          />
          {isHovered && photoIcon}
        </div>
      </Link>

      <div className="flex flex-col">
        <div className="flex gap-4 flex-col space-y-1 font-medium dark:text-white">
          <div>
            <span className="text-2xl font-bold">Name: {userName}</span>
          </div>
          <div>
            <span className="text-2xl font-bold">Email: {userEmail}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Member since: {convertedDate.created}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
