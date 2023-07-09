import React from 'react';

function LoginInput({label, autoComplete, name, autoFocus, type, disabled}) {
    return (
        <fieldset className="w-full my-3" disabled={disabled}>
            <legend className="px-3">{label}</legend>
            <input type={type} className="w-full py-3 px-5 bg-gray-100 border-2 border-gray-300 rounded outline-none focus:border-blue-600" name={name} id={name} autoComplete={autoComplete} autoFocus={autoFocus} required />
        </fieldset>
    );
}

export default LoginInput;
