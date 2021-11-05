import { useEffect, useState } from "react";
import { db } from "../firebase/config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const useFirestore = () => {
    const [docs, setDocs] = useState([]);

    const dbRef = collection(db, 'images'); 
    const q = query(dbRef, orderBy('createdAt', 'desc')); /* query */

    useEffect(() => {
        const unsub = onSnapshot(q, (querySnapshot) => {
            let imageDocs = [];
            querySnapshot.forEach(doc => {
                imageDocs.push({ ...doc.data(), id: doc.id });
            });
            setDocs(imageDocs);
        })

        return () => unsub();
    }, []) //this might trigger an error, i removed collection dependencies to see why it's needed

    return { docs }
}

export default useFirestore;