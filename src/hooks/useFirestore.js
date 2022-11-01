//add new docs to firestore collection (or remove them)

import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  //remember cleanup, when components unmounts (is true), dont update local state
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  //only dispatch f not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  console.log("collection: " + collection);

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      console.log("aika hommeli: " + createdAt);
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      console.log(err.message);
    }
  };

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "Could not delete document",
      });
    }
  };

  //cleanupfunction
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};

export default useFirestore;
