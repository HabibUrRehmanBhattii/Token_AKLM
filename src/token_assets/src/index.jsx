import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 

  // Create an AuthClient instance.
  const authClient = await AuthClient.create();
  // Check if the user is already authenticated.
  if(await authClient.isAuthenticated()){
    // console.log("Authenticated");
    handleAuth(authClient);
  } else{
    // If the user is not authenticated, render the login page.
    await authClient.login({
      identyProvider: "https://identity.ic0.app",
      onSuccess: () => {
        handleAuth(authClient);// handleAuth is a function that renders the main page.
      },
    });
  }



// if user is authenticated, render the app
  async function handleAuth(authClient){
    ReactDOM.render(<App />, document.getElementById("root"));
  };

};

init();


