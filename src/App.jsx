import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from './core/firebase/firebaseConfig';
import LoginLoad from './components/login/LoginLoad';
import LoginLayout from './layout/LoginLayout';
import ChatLayout from './layout/ChatLayout';
import { toast } from 'react-hot-toast';

function App() {

    const [user, userLoading, userError] = useAuthState(firebase.auth);

    React.useEffect(() => {
        if (userError) toast.error(userError?.message);
    }, [userError]);

    return (
        <main className="w-full h-full max-w-7xl max-h-[678px] bg-white rounded-md shadow-xl overflow-hidden">
            {userLoading && <LoginLoad />}
            {!userLoading && !user && <LoginLayout />}
            {!userLoading && user && <ChatLayout />}
        </main>
    );
}

export default App;
