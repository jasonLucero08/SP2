import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  // const [loading, setLoading] = useState(true);

  const fetchProfile = async (profileId) => {
    if (profileId !== undefined) {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", profileId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    }
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        setSession(session);
        setUser(session?.user);
        fetchProfile(session?.user?.id);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user);
        fetchProfile(session?.user?.id);
        // setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []); // Add dependency array to run effect only once

  const signOut = () => {
    sessionStorage.clear();
    setProfile(null);
    supabase.auth.signOut();
    navigate("/");
  };

  const value = {
    profile,
    session,
    user,
    fetch: (id) => {
      fetchProfile(id);
    },
    signOut: signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
