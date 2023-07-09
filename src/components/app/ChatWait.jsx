import React from 'react';
import ImageStart from '../../images/start.png';

function ChatWait() {
    return (
        <section className="flex-[3] flex flex-col justify-center items-center">
            <img src={ImageStart} alt="Start messaging" width={400} />
        </section>
    );
}

export default ChatWait;
