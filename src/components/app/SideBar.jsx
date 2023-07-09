import React from 'react';
import Logo from '../Logo';
import Tippy from '@tippyjs/react';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdOutlineSearch } from 'react-icons/md';
import { useSignOut } from 'react-firebase-hooks/auth';
import firebase from '../../core/firebase/firebaseConfig';
import LoadSVG from 'react-loadsvg';
import { useDevContext } from '../../core/context/DevContext';
import User from '../user/User';
import sortBy from 'sort-by';
import { ReactComponent as BeginImage } from '../../images/begin.svg';
import { ReactComponent as SadImage } from '../../images/sad.svg';
import SearchUser from '../user/SearchUser';

function SideBar() {
    const [logout] = useSignOut(firebase.auth);

    const { user, userList, userListLoading, connections } = useDevContext();

    const [sideUsers, setSideUsers] = React.useState([]);

    const [searchUser, setSearchUser] = React.useState("");
    const [searchList, setSearchList] = React.useState(null);

    React.useEffect(() => {
        let list = null;
        if (searchUser) {
            list = userList.filter(item => item.uid !== user.uid).filter(item => (item.displayName.toLowerCase().includes(searchUser.trim().toLowerCase()))).map(item => ({ uid: item.uid, user: item, name: item.displayName }));
            list.sort(sortBy("-name"));
            console.log(list);
        }
        setSearchList(list);
    }, [searchUser, user.uid, userList]);

    React.useEffect(() => {
        const users = [];
        if (connections) {
            users.push(...connections.map((item) => {
                const friendID = item.users[0] === user.uid ? item.users[1] : item.users[0];
                const friendData = userList.find(data => data.uid === friendID);
                return {
                    uid: friendData.uid,
                    name: friendData.displayName,
                    user: friendData,
                    message: item.message,
                    time: item.updated,
                    isMe: item.sender === user.uid,
                }
            }));
            users.sort(sortBy("-time"));
        }
        setSideUsers(users);
    }, [connections, user.uid, userList]);

    return (
        <aside className="flex-[1] bg-gray-100 flex flex-col border-r border-r-gray-200">
            <header className="w-full pl-5 pr-2 py-2 flex items-center justify-between h-13">
                <Logo />
                <Tippy content="Logout" placement="bottom">
                    <button type="button" className="w-10 h-10 rounded-full text-xl hover:bg-gray-300 transition-all flex justify-center items-center" onClick={logout}>
                        <BiLogOutCircle />
                    </button>
                </Tippy>
            </header>
            <div className="w-full p-2 bg-gray-200 relative">
                <MdOutlineSearch className="absolute left-4 top-2/4 -translate-y-1/2 text-xl text-gray-600" />
                <input className="w-full rounded px-3 outline-none py-2 pl-9" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} autoFocus placeholder="Search users..." type="search" />
            </div>
            {userListLoading && <div className="w-full flex-1 flex p-10 items-center flex-col">
                <LoadSVG size={30} />
            </div>}
            {!userListLoading && searchList && (searchList?.length > 0 ?
                <ul className="block w-full overflow-x-hidden overflow-y-auto">
                    {searchList.map(item => <SearchUser key={item.uid} {...item} onClick={() => setSearchUser("")} />)}
                </ul>
                :
                <div className="w-full flex-1 flex pt-10 px-1 pb-0 items-center flex-col justify-between">
                    <div className="text-sm font-bold text-center">No user found with this <span className="text-blue-600">keyword</span>.<br />Try different name.</div>
                    <SadImage />
                </div>
            )}
            {!userListLoading && !searchList && (sideUsers?.length > 0 ?
                <ul className="block w-full overflow-x-hidden overflow-y-auto">
                    {sideUsers.map((item) => <User key={item.uid} {...item} />)}
                </ul>
                :
                <div className="w-full flex-1 flex pt-10 px-1 pb-0 items-center flex-col justify-between">
                    <div className="text-sm font-bold text-center">Search for a <span className="text-blue-600">user</span> to begin chatting...</div>
                    <BeginImage />
                </div>
            )}
        </aside>
    );
}

export default SideBar;
