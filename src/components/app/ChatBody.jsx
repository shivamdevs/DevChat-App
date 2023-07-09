import React from 'react';
import { useDevContext } from '../../core/context/DevContext';
import UserImage from '../../images/user.png';
import autosize from 'autosize';
import { BsSendFill } from 'react-icons/bs';
import useSendMessage from '../../core/hooks/useSendMessage';
import MessageBox from '../chat/MessageBox';

function ChatBody() {

    const { connectedUser } = useDevContext();

    const textareaRef = React.useRef(null);

    const sendMessage = useSendMessage();
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        if (textareaRef.current) autosize(textareaRef.current);
    }, []);

    return (
        <section className="flex-[3] flex flex-col">
            <header className="flex w-full items-center px-3 py-2 bg-gray-200 gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img src={UserImage} alt={connectedUser?.displayName} />
                </div>
                <div className="flex-1 relative h-7 text-lg font-bold text-teal-900">
                    <p className="absolute inset-0 overflow-hidden text-ellipsis whitespace-nowrap">{connectedUser?.displayName}</p>
                </div>
            </header>
            <article className="flex-1 relative">
                <MessageBox />
            </article>
            <footer className="w-full flex items-center gap-3 p-3 bg-gray-200">
                <textarea ref={textareaRef} className="bg-white flex-1 resize-none outline-none rounded p-3 h-12 overflow-y-auto max-h-60" value={message} placeholder="Type your message..." onKeyDown={(e) => {
                    if (e.which === 13 && !e.shiftKey) {
                        e.target.nextElementSibling?.click();
                        e.preventDefault();
                        e.target.style.height = "";
                    }
                }} onChange={(e) => setMessage(e.target.value)} autoFocus></textarea>
                <button type="button" onClick={() => {
                    sendMessage(message);
                    setMessage("");
                }} className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-300 rounded-full transition-all text-purple-700 disabled:text-gray-400 disabled:bg-transparent">
                    <BsSendFill />
                </button>
            </footer>
        </section>
    );
}

export default ChatBody;
