import React from 'react';
import LoginInput from './LoginInput';
import Logo from '../Logo';
import LoginSubmit from './LoginSubmit';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import firebase from '../../core/firebase/firebaseConfig';
import { toast } from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

function LoginCreate() {

    const [createUser] = useCreateUserWithEmailAndPassword(firebase.auth)
    const [updateProfile] = useUpdateProfile(firebase.auth);

    const [loading, setLoading] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const { name, email, password } = e.target.elements;

        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (!nameValue) return name.focus();
        if (!emailValue) return email.focus();
        if (!passwordValue) return password.focus();

        setLoading(true);

        createUser(emailValue, passwordValue)
            .then((result) => result.user)
            .then((user) => setDoc(doc(firebase.store, "users", user.uid), {
                uid: user.uid,
                email: emailValue,
                displayName: nameValue,
            }))
            .then(() => updateProfile({ displayName: nameValue }))
            .then(() => {
                toast.success(`Welcome to DevChat - '${nameValue}'.`);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err?.message);
            });
    }

    return (
        <form className="w-full m-auto max-w-xs" onSubmit={handleSubmit}>
            <div className="text-center"><Logo /></div>
            <h2 className="text-lg font-bold text-gray-700 text-center my-5">Create a new account</h2>
            <LoginInput type="text" name="name" label="Full name" autoComplete="name" autoFocus disabled={loading} />
            <LoginInput type="email" name="email" label="Email address" autoComplete="email" disabled={loading} />
            <LoginInput type="password" name="password" label="Password" autoComplete="current-password" disabled={loading} />
            <LoginSubmit disabled={loading} />
        </form>
    );
}

export default LoginCreate;
