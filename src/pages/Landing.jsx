import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient";

import LandingLogo from "../components/LandingLogo";

export default function Landing() {
  // const handleSignIn = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //     });

  //     if (error) {
  //       throw error;
  //     }

  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error signin in:", error.message);
  //   }
  // };
  return (
    <div className="h-screen flex bg-stone-bg bg-cover">
      <LandingLogo />

      <div className="flex grow">
        <div className="flex flex-col bg-white place-content-center place-self-center h-2/5 w-4/5 rounded-md p-10 gap-5">
          <span className="font-bold text-2xl text-center">
            Sign in using your Google Account
          </span>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["google"]}
            onlyThirdPartyProviders
          />
          {/* <button onClick={() => handleSignIn()}>Sign In</button> */}
        </div>
      </div>
    </div>
  );
}
