import { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    //prevent reload
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
    });
  };

  console.log("User ID: " + uid);

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

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
