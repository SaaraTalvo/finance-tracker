import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

//subscribe data from firestore

const useCollection = (collection, _query) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //_query is array and is "different" on every funciton call. So need to
  //stop infinite loop
  const query = useRef(_query).current;

  //remember, here, fires once to begin, and also then every time collection changes -> dependency
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    //if there  is a sewcond arg, the query, the where method would get the 2 arguments . where userid == the same as the current users id
    if (query) {
      ref = ref.where(...query);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    //unsubscribe from the real time listenr on unmount
    return () => unsubscribe();
  }, [collection, query]);
  return { documents, error };
};

export default useCollection;
