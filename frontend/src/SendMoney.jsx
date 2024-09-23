import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { usersAtom } from "./sources/atoms/usersAtom"
import { transfererUser } from "./sources/atoms/sendUserAtom"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export default function SendMoney(){
    let timeout;
    const navigate = useNavigate()
    const users = useRecoilValue(usersAtom)
    const setTransfererUserId = useSetRecoilState(transfererUser)

    const [inputValue, setInputValue] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setCurrentUserId(decodedToken.id);
                console.log(decodedToken)
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    useEffect(() => {
        // Initialize filteredUsers with users when the component mounts
        setFilteredUsers(users || []);
    }, [users]);

    useEffect(() => {
        // Filter users based on inputValue when it changes and exclude current user
        if (users && Array.isArray(users)) {
            const filtered = users.filter((user) =>
                user.firstname.toLowerCase().includes(inputValue.toLowerCase()) &&
                user._id !== currentUserId
            );
            setFilteredUsers(filtered);
        }
    }, [inputValue, users, currentUserId]);

    function debounce(value){
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            setInputValue(value.toLowerCase())
        }, 500)
    }

    const logo = () => {
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen bg-custom-black text-white">
            {/* Navigation */}
            <nav className="flex justify-between p-5 lg:px-10 bg-custom-purple text-custom-teal drop-shadow-2xl">
                <div className="font-black text-2xl my-auto">
                 <button onClick={logo}>
                    <span className="text-custom-yellow">Pay4U</span> 
                 </button>
                </div>
                <div className="flex gap-3">
                    <div className="text-xl font-bold m-auto hidden md:block">Hello,</div>
                    <button className="flex gap-2">
                        <div className="text-xl bold m-auto hidden md:block">User</div>
                        <div className="m-auto border rounded-full p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Main Section */}
            <main className="lg:px-10">
                <div className="flex flex-col p-7 gap-2">
                    <div className="font-black text-xl w-full">Users:</div>
                    <input type="text" className="md:w-1/3 rounded-lg bg-slate-950 p-3 mt-2 outline-none" placeholder="Search User" onChange={(e) =>
                        debounce(e.target.value)}/>
                    {filteredUsers && filteredUsers.map((user)=>{
                        return (
                        <div className="flex justify-between mt-2" key={user._id}>
                            <div className="font-bold my-auto">{user.firstname} {user.lastname}</div>
                            <button className="bg-custom-yellow hover:bg-custom-indigo text-custom-black py-2 px-4 rounded-lg font-bold"
                            onClick={()=>{
                                setTransfererUserId([user._id, `${user.firstname} ${user.lastname}`])
                                navigate('/sendMoney')
                                
                            }}>Send Money</button>
                        </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}