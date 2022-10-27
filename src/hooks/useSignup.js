import { useState } from "react";
import { useEffect } from "react";

import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  //wait for user to fill form and when users submits form, we invoke signup function
  const signup = async (email, password, displayName) => {
    //because if there was an error this function is called again
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //add displayname to user, because createuserwithemailandpassword..method does not allow us to pass in displayname as parameter
      await res.user.updateProfile({ displayName: displayName });

      //dispatch login action, so that the user eg. is logged in when signed up
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //cleanup function returned in useEffect! fires once when logout is called. when component that uses this component unmounts, this fires and cancels everything that is going on in the background
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
