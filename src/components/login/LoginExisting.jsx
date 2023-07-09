import React from 'react';
import LoginInput from './LoginInput';
import Logo from '../Logo';
import LoginSubmit from './LoginSubmit';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import firebase from '../../core/firebase/firebaseConfig';
import { toast } from 'react-hot-toast';

function LoginExisting() {

    const [loginUser] = useSignInWithEmailAndPassword(firebase.auth);

    const [loading, setLoading] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target.elements;

        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (!emailValue) return email.focus();
        if (!passwordValue) return password.focus();

        setLoading(true);

        loginUser(emailValue, passwordValue)
            .then((result) => {
                toast.success(`Welcome back to DevChat - '${result.user.displayName}'.`);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err?.message);
            });
    }

    return (
        <form className="w-full m-auto max-w-xs" onSubmit={handleSubmit}>
            <div className="text-center"><Logo /></div>
            <h2 className="text-lg font-bold text-gray-700 text-center my-5">Login to your existing account</h2>
            <LoginInput type="email" name="email" label="Email address" autoComplete="email" autoFocus disabled={loading} />
            <LoginInput type="password" name="password" label="Password" autoComplete="current-password" disabled={loading} />
            <LoginSubmit disabled={loading} />
        </form>
    );
}

export default LoginExisting;
