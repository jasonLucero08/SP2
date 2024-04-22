import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./Getters";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(null);
  const [userName, setUsername] = useState(null);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      setSession(session);
      setUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user);

        if (event === "SIGNED_IN") {
          getUserInfo(session?.user.id).then(function (res) {
            setFullName(res?.fullname);
            setUsername(res?.username);

            if (userName == null && fullName == null) {
              navigate("/create-username");
            } else {
              navigate("/home");
            }
          });
        } else if (event === "SIGNED_OUT") {
          navigate("/");
        }

        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  });

  const value = {
    session,
    user,
    signOut: () => {
      supabase.auth.signOut();
      navigate("/");
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
