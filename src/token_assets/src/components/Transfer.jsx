import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token"


function Transfer() {
  
  const [recipentId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisble, setIsDisble] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  async function handleClick() {
    setIsDisble(true);
    setIsHidden(true); 
    const recipent = Principal.fromText(recipentId);
    const amountToSend = Number(amount);
    const result= await token.transfer(recipent, amountToSend  );
    setFeedback(result);
    setIsHidden(false);
    setIsDisble(false);
    
   
   
   
   
    setIsDisble(false);
    
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipentId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange= {(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick} 
          disabled={isDisble}
          >
            Transfer
          </button>
        </p>
        <p hidden={isHidden} >{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
