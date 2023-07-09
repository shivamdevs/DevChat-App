// import React from 'react';
import { useDevContext } from '../context/DevContext';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import firebase from '../firebase/firebaseConfig';
import { toast } from 'react-hot-toast';

export default function useSendMessage() {
    const { user, connection, connectedUser } = useDevContext();

    function finallySend(data, message) {
        const docRef = doc(collection(firebase.store, "messages"));
        setDoc(docRef, {
            id: docRef.id,
            connection: data.id,
            sender: user.uid,
            message: message,
            sentTime: Date.now(),
        }).then(() => updateDoc(doc(firebase.store, "connections", data.id), {
            message: message,
            sender: user.uid,
            updated: Date.now(),
        })).catch((err) => {
            toast.error(err?.message);
        });
    }

    function sendMessage(message) {
        if (!connection) {
            const docRef = doc(collection(firebase.store, "connections"));
            const docData = {
                id: docRef.id,
                users: [user.uid, connectedUser.uid],
                created: Date.now(),
                [user.uid]: user.uid,
                [connectedUser.uid]: connectedUser.uid,
            };
            setDoc(docRef, docData).then(() => {
                finallySend(docData, message);
            }).catch((err) => {
                toast.error(err?.message);
            });
        } else {
            finallySend(connection, message);
        }
    }
    return sendMessage;
}
