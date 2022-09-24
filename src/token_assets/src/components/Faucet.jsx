import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token"
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {

  const [isDisble, setIsDisble] = useState(false);
  const [buttonText, setButtonText] = useState("Give me tokens");

  async function handleClick(event) {
    setIsDisble(true);

    /////////////////////// This section needed when deploying to the internet computer/////////////////////////////////////

    // // Create an AuthClient instance.
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();
    
    // const authCanister = createActor(canisterId, {
    //   agentOptions:{
    //     identity,
    //   },
    // });
//////////////////////////////////////////////////////////////////s///////////////////////////////////////////////////
    const result = await token.payOut();// change this to authCanister.payOut() to use the authenticated canister. when deploying Online
    setButtonText(result);
    //setIsDisble(false);  
    
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 AKLH coins to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisble}
        >
        {buttonText}          
        </button>
      </p>
    </div>
  );
}

export default Faucet;
