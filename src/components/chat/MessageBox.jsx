import React from 'react'
import { useDevContext } from '../../core/context/DevContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import firebase from '../../core/firebase/firebaseConfig';
import LoadSVG from 'react-loadsvg';
import sortBy from 'sort-by';
import Message from './Message';
import { toast } from 'react-hot-toast';

function MessageBox() {

    const { connection, connectedUser } = useDevContext();

    const [messageList, messageListLoad, messageListError] = useCollectionData(query(collection(firebase.store, "messages"), where("connection", "==", connection?.id || "")));

    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        if (messageListError) toast.error(messageListError?.message);
        console.log(messageList, messages);
    }, [messageList, messageListError, messages]);

    React.useEffect(() => {
        if (messageList) {
            const sortedMessages = [...messageList];
            sortedMessages.sort(sortBy("sentTime"));
            setMessages(sortedMessages);
        }
    }, [messageList]);

    if (messageListLoad) return (
        <div className="flex justify-center p-10">
            <LoadSVG size={30} />
        </div>
    );

    if (!messageList || !messages || messages.length === 0) return (
        <div className="flex justify-center p-10">
            <div className="text-sm font-bold px-10 py-3 bg-gray-200 rounded-lg">Start your conversation with <span className="text-blue-600">{connectedUser.displayName}</span> now.</div>
        </div>
    );

    return (
        <div className="flex flex-col-reverse overflow-y-auto overflow-x-hidden w-full h-full absolute inset-0">
            <ul className="">
                {messages?.map(message => <Message key={message.id} {...message} />)}
            </ul>
        </div>
    )
}

export default MessageBox;
