import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  //   check if user is authenticated and if so, set he authUser data and connect to socket.io
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check-auth");
      if (data.success) {
        setAuthUser(data.user);
      }
    } catch (error) {
      toast.error("Failed to authenticate user", error.message);
    }
  };

  //   login user to handle authentication and socket connection
  const loginUser = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed", error.message);
    }
  };

  //   logout function to clear user data and disconnect socket
  const logoutUser = () => {
    setAuthUser(null);
    setToken(null);
    setOnlineUsers([]);
    localStorage.removeItem("token");
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
  };

  //   update user profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.userData);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile", error.message);
    }
  };

  //   connect to socket.io server
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (usersIds) => {
      setOnlineUsers(usersIds);
    });
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
    connectSocket(authUser);
    setLoading(false);
  }, []);
  const value = {
    axios,
    token,
    authUser,
    onlineUsers,
    loading,
    loginUser,
    logoutUser,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>;
};
