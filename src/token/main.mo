import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    Debug.print("Token actor created");

    let owner : Principal = Principal.fromText("ubqch-o23vf-lwarl-bxlts-ar6ld-b5jmv-3z63u-yxl6d-cdow5-oqufy-bae");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "AKLH";

    // The balances of the token holders are stored in a hashmap with the key being the principal and the value being the balance
    private stable var balanceEntries : [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
    //1 is the initial size of the ledger //Principal.equal and Principal.hash are used to compare and hash the principals

 
    //Check balance function
    public query func balanceOf(who: Principal) : async Nat { //balanceOf is the function name and who is the parameter of the function 
        //Check if the user is present in the ledger
        let balance: Nat = switch (balances.get(who)){
            case (null) 0; //If the user is not present in the ledger, return 0
            case (?result) result; //If the user is present in the ledger, return the balance
        };

        return balance;
        };

        //transfer symbol from the backend to frontend
        public query func getSymbol() : async Text {
            return symbol;
        };

        //Changeing Text of gime gime to Success
        public shared(msg) func payOut() : async Text{
            // Debug.print(debug_show(msg.caller));
            if(balances.get(msg.caller) == null){
                let amount = 1000;
                let result = await transfer(msg.caller, amount); //Fixing key problem where we supply unlimited amount of tokens 
                // balances.put(msg.caller, amount);
                return result;
            }else{
                return "Already have";
            }
        };

        //Transfer function
        public shared(msg) func transfer(to : Principal, amount: Nat): async Text {//transfer is the function name, to is the receiver and amount is the amount to be transferred
            let fromBalance = await balanceOf(msg.caller);//Get the balance of the sender from the ledger 
            if(fromBalance > amount){//Check if the sender has enough balance to transfer 
                let newFromBalance: Nat = fromBalance - amount;//Subtract the amount from the sender's balance 
                balances.put(msg.caller, newFromBalance);//msg.caller is the key and newFromBalance is the value
                
                let toBalance = await balanceOf(to);//Get the balance of the receiver from the ledger
                let newToBalance: Nat = toBalance + amount;//Add the amount to the receiver's balance 
                balances.put(to, newToBalance);//to is the key and newToBalance is the value
                return "Success";
                
                
            }else{
                return "Not enough balance";
            }
            
            
        };



       system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };
    };

