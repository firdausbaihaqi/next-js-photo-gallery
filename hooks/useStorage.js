import { useEffect, useState } from 'react';
import { storage, db, timestamp } from '../firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'

const useStorage = (file, width, height, selectedTags, isAnonymous) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = ref(storage, file.name);  // ref contains firebase storage instance, directory/path in firebase storage
        const dbRef = collection(db, "images")

        // upload to storageRef path in firebase, with image file from params
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_change', (snapshot) => {
            const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progressPercentage);
        }, (error) => {
            setError(error);
        }, async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(dbRef, {
                url,
                createdAt: timestamp,
                fileName: file.name,
                width: width,
                height: height,
                isAnonymous: isAnonymous,
                selectedTags: selectedTags,
            })
            setUrl(url)
        })
    }, [file])

    return { progress, error, url }
}


export default useStorage;