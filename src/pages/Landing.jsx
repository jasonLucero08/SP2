import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient";

import LandingLogo from "../components/LandingLogo";

export default function Landing() {
  return (
    <div className="h-screen flex bg-slate-900">
      <LandingLogo />

      <div className="flex grow">
        <div className="flex flex-col bg-white place-content-center place-self-center h-1/2 w-4/5 rounded-xl p-10">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["google"]}
            onlyThirdPartyProviders
            redirectTo="http://localhost:5173/home"
          />
        </div>
      </div>
    </div>
  );
}
