import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token"

function Balance() {
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBlanceResult] = useState("");
  const [crryptosymbol, setsymbol] = useState("");
  const [isHidden, seIsHidden] = useState(true);

  async function handleClick() {


    console.log(inputValue);

    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);

    setBlanceResult(balance.toLocaleString()); 
    setsymbol(await token.getSymbol());
    seIsHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
      <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden} >This account has a balance of {balanceResult} {crryptosymbol} .</p>
    </div>
  );
}

export default Balance;
