import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  //cleanup, updated to true in the cleanup function
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //sign user in, the const res gets us a user, which is the payload
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch is used as a callback which gets invoked once some async action is complete.
      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //cleanup function returned in useEffect! fires once when login is called. when component that uses this component unmounts, this fires and cancels everything that is going on in the background
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
