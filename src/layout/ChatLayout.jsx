import React from 'react';
import DevContext from '../core/context/DevContext';
import SideBar from '../components/app/SideBar';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import firebase from '../core/firebase/firebaseConfig';
import { toast } from 'react-hot-toast';
import ChatBody from '../components/app/ChatBody';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatWait from '../components/app/ChatWait';

function ChatLayout() {
    const [user] = useAuthState(firebase.auth);
    const [userList, userListLoading, userListError] = useCollectionData(collection(firebase.store, "users"));
    const [connections, , connectionError] = useCollectionData(query(collection(firebase.store, "connections"), where(user.uid, "==", user.uid)));
    const [connectedUser, setConnectedUser] = React.useState(null);
    const [connection, setConnection] = React.useState(null);

    React.useEffect(() => {
        setConnection(connections?.find(data => (data[user.uid] && data[connectedUser?.uid])));
    }, [connectedUser, connections, user.uid]);

    React.useEffect(() => { if (userListError) toast.error(userListError?.message); }, [userListError]);
    React.useEffect(() => { if (connectionError) toast.error(connectionError?.message); }, [connectionError]);

    const devContext = {
        user,

        userList,
        userListLoading,

        connectedUser,
        setConnectedUser,

        connections,

        connection,
    };

    return (
        <DevContext.Provider value={devContext}>
            <section className="w-full h-full flex">
                <SideBar />
                {!connectedUser && <ChatWait />}
                {connectedUser && <ChatBody key={connectedUser.uid} />}
            </section>
        </DevContext.Provider>
    );
}

export default ChatLayout;
