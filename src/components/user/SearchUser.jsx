import React from 'react';
import UserImage from '../../images/user.png';
import { useDevContext } from '../../core/context/DevContext';

function SearchUser({ user, name, onClick }) {

    const { connectedUser, setConnectedUser } = useDevContext();

    return (
        <li className="block border-b border-b-gray-400 first-of-type:border-t first-of-type:border-t-gray-400">
            <button type="button" className="flex w-full px-3 py-2 items-center gap-3 text-left hover:bg-gray-300 transition-all data-[user=true]:bg-gray-300" data-user={connectedUser?.uid === user.uid} onClick={() => {
                setConnectedUser(user);
                onClick?.();
            }}>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                    <img src={UserImage} alt={name} />
                </div>
                <div className="flex-1 relative h-5 font-bold">
                    <p className="absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
                </div>
            </button>
        </li>
    );
}

export default SearchUser;
