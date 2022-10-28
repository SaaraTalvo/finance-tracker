import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

//subscribe data from firestore

const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //remember, here, fires once to begin, and also then every time collection changes -> dependency
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

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
  }, [collection]);
  return { documents, error };
};

export default useCollection;
