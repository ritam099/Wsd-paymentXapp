import { useEffect, useState } from "react"
import { baseBackendUrl } from "../shared/urls"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

export default function Transaction() {
    const [transactions, setTransactions] = useState([])
    const [filteredTransactions, setFilteredTransactions] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [currentUserId, setCurrentUserId] = useState(null);
    const [transactionType, setTransactionType] = useState("all")
    const [firstname, setFirstname] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setCurrentUserId(decodedToken.id);
                setFirstname(decodedToken.username);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);
    let timeout;

    useEffect(() => {
        fetchTransactions()
    }, [])

    useEffect(() => {
        const filtered = transactions.filter((transaction) => {
            const matchesSearch = (transaction.sender && transaction.sender.toLowerCase().includes(inputValue.toLowerCase())) ||
                (transaction.receiver && transaction.receiver.toLowerCase().includes(inputValue.toLowerCase()));
            
            const matchesType = transactionType === "all" ||
                (transactionType === "debit" && transaction.senderId === currentUserId) ||
                (transactionType === "credit" && transaction.receiverId === currentUserId);

            return matchesSearch && matchesType;
        });
        setFilteredTransactions(filtered);
    }, [inputValue, transactions, transactionType, currentUserId]);
  
    const fetchTransactions = async () => {
        try {
            const response = await fetch(`${baseBackendUrl}/transaction/view`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            console.log(data)
            setTransactions(data.transactions)
            setFilteredTransactions(data.transactions)
        } catch (error) {
            console.error("Error fetching transactions:", error)
        }
    }

    function debounce(value) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setInputValue(value)
        }, 500)
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/sign-in");
    };

    return (
        <div className="min-h-screen bg-custom-black text-custom-purple">
            <nav className="flex justify-between p-5 lg:px-10 bg-custom-purple text-custom-teal drop-shadow-2xl">
                <div className="font-black text-2xl my-auto">
                    <span className="text-custom-yellow">Pay4U</span> 
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-xl font-bold m-auto hidden md:block">Hello,</div>
                    <button className="flex gap-2">
                        <div className="text-xl bold m-auto hidden md:block">{firstname}</div>
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
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="lg:px-10">
                <div className="flex flex-col p-7 gap-2">
                    <div className="font-black text-xl w-full mb-4">Transactions:</div>
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            className="md:w-1/3 rounded-lg bg-custom-white   text-custom-teal p-3 outline-none"
                            placeholder="Search transactions"
                            onChange={(e) => debounce(e.target.value)}
                        />
                        <select
                            className="rounded-lg bg-custom-white text-custom-teal p-3 outline-none"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            <option value="all">All Transactions</option>
                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                        </select>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-custom-white">
                                <th className="p-2 text-left text-custom-teal">Sender</th>
                                <th className="p-2 text-left text-custom-teal">Receiver</th>
                                <th className="p-2 text-right text-custom-teal">Amount</th>
                                <th className="p-2 text-right text-custom-teal">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => {
                                const isDebit = transaction.senderId === currentUserId;
                                const amountColor = isDebit ? 'text-red-500' : 'text-green-500';
                                return (
                                    <tr key={transaction._id} className="border-b border-custom-purple">
                                        <td className="p-2 text-custom-yellow font-semibold">{transaction.sender || 'Unknown'}</td>
                                        <td className="p-2 text-custom-yellow font-semibold">{transaction.receiver || 'Unknown'}</td>
                                        <td className={`p-2 text-right ${amountColor}`}>
                                            ${transaction.amount}
                                        </td>
                                        <td className="p-2 text-right text-custom-yellow">
                                            {new Date(transaction.date).toLocaleString()}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
