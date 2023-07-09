import React from 'react';
import LoginExisting from '../components/login/LoginExisting';
import LoginCreate from '../components/login/LoginCreate';

function LoginLayout() {

    const [section, setSection] = React.useState("login");

    return (
        <div className="w-full h-full flex flex-col">
            <header className="flex w-full h-12 shadow-lg bg-gray-300">
                <HeaderButton type="login" content="Login" setSection={setSection} section={section} />
                <HeaderButton type="signup" content="Sign up" setSection={setSection} section={section} />
            </header>
            {section === "login" && <LoginExisting />}
            {section === "signup" && <LoginCreate />}
        </div>
    );
}

export default LoginLayout;

function HeaderButton({type, content, section, setSection}) {
    return (<button className="flex-1 w-[50%] font-bold transition-all hover:bg-gray-400 data-[section=true]:bg-blue-700 data-[section=true]:text-white rounded-t-md" data-section={section === type} onClick={() => setSection(type)} type="button">{content}</button>);
}