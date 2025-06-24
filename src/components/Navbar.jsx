import React, { useState, useEffect } from "react";
import profileImage from "./deault-avatar.jpg";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user logged in!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="mt-3 flex items-center justify-between px-4">
      <h1 className="text-2xl font-bold text-[#202848]">My Tasks</h1>
      <div className="flex items-center space-x-4 relative">
        <button
          onClick={() => navigate("/addTask")}
          className="bg-[#202848] text-white cursor-pointer p-2 rounded border-2 border-white"
        >
          + New Task
        </button>

        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={profileImage}
            className="w-10 h-10 rounded-full border-2 border-[#202848]"
            alt="Avatar"
          />

          {isHovered && user && (
            <div className="absolute right-0 mt-2 bg-white text-[#202848] p-4 w-48 rounded shadow-lg">
              <p className="font-semibold">{user.Name}</p>
              <p className="text-sm">{user.email}</p>
              <button
                onClick={handleLogout}
                className="mt-2 w-full py-1 bg-[#202848] text-white rounded hover:bg-[#334977]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
