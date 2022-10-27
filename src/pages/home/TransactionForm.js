import { useState } from "react";

const TransactionForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    //prevent reload
    e.preventDefault();
    console.log({
      name,
      amount,
    });
  };

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            //jos setNamea muutetaan ulkopuolelta
            value={name}
          />
        </label>
        <label>
          <span>Amount (€):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            //jos muutetaan ulkopuolelta
            value={amount}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
