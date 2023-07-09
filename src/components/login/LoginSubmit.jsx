import React from 'react';

function LoginSubmit({ disabled }) {
    return (
        <button type="submit" className="w-full my-5 px-5 py-2 rounded-lg mx-auto bg-purple-500 text-white hover:bg-purple-800 transition-all font-bold disabled:bg-gray-500" disabled={disabled}>Submit</button>
    );
}

export default LoginSubmit;
