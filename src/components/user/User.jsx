import React from 'react';
import UserImage from '../../images/user.png';
import getDisplayDate from '../../core/function/getDisplayDate';
import { useDevContext } from '../../core/context/DevContext';

function User({ user, name, time, message, isMe }) {

    const { connectedUser, setConnectedUser } = useDevContext();

    return (
        <li className="block border-b border-b-gray-400 first-of-type:border-t first-of-type:border-t-gray-400">
            <button type="button" className="flex w-full px-3 py-2 items-center gap-3 text-left hover:bg-gray-300 transition-all data-[user=true]:bg-gray-300" data-user={connectedUser?.uid === user.uid} onClick={() => setConnectedUser(user)}>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img src={UserImage} alt={name} />
                </div>
                <div className="flex-1">
                    <div className="flex w-full gap-3 items-center justify-between">
                        <div className="flex-1 relative h-5 font-bold">
                            <p className="absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
                        </div>
                        <div className="text-xs font-extrabold text-purple-600">{getDisplayDate(time)}</div>
                    </div>
                    <div className="w-full h-5 relative text-sm font-semibold text-gray-500 mt-1">
                        <p className="absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap">{isMe && <span className="font-bold">You: </span>}{message}</p>
                    </div>
                </div>
            </button>
        </li>
    );
}

export default User;
