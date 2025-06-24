import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return user ? (
    <div className="flex bg-[#202848]">
      <SideBar />
      <div className="w-full sm:ml-[20vw]">
        <Dashboard />
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;
