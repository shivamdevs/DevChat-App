import React from 'react';
import { useDevContext } from '../../core/context/DevContext';
import classNames from 'classnames';
import getDisplayDate from '../../core/function/getDisplayDate';

function Message({ message, sentTime, sender }) {

    const { user } = useDevContext();

    return (
        <li className={classNames(
            "my-1 flex items-center px-4",
            {
                "justify-start": user.uid !== sender,
                "justify-end": user.uid === sender,
            }
        )}>
            <div className={classNames(
                "max-w-[75%] rounded-lg p-2",
                {
                    "rounded-tl-none bg-purple-800 text-white": user.uid !== sender,
                    "rounded-tr-none bg-gray-300": user.uid === sender,
                }
            )}>
                <div className="whitespace-pre-wrap">{message}</div>
                <div className={classNames(
                    "w-full text-right text-[11px] font-extrabold mt-3",
                    {
                        "text-gray-200": user.uid !== sender,
                        "text-gray-600": user.uid === sender,
                    }
                )}>{getDisplayDate(sentTime, true)}</div>
            </div>
        </li>
    );
}

export default Message;
