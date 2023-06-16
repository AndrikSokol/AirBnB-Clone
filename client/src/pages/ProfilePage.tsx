import React from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import style from "../assets/css/profilePage.module.scss";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { api } from "../services/api";
import { IUser, IUserContext } from "../types/user.interface";

const ProfilePage = () => {
  const [redirect, setRedirect] = React.useState<string | null>(null);
  const { user, ready, setUser } = React.useContext<IUserContext>(UserContext);

async function logout() {
    try {
      await api.logout();
      setRedirect("/");
      setUser({}as IUser);
    } catch (e) {
    }
  }

  if (redirect === "/") {
    return <Navigate to="/" />;
  }

  if (!ready && !user) {
    return (
      <div className={style.loading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  if (user === null && ready && !redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center max-w-lg mx-auto">
        {user !==null && <div>Logged in as {user.username} ({user.email})
        </div>}
          
        <button
          onClick={logout}
          className="bg-primary w-full max-w-sm py-2 px-6 mt-4 font-bold text-white rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;