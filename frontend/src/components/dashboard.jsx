import { useRecoilState } from "recoil";
import { balanceAtom } from "../sources/atoms/balanceAtom";
import { useEffect, useState } from "react";
import { baseBackendUrl } from "../../shared/urls";
import CardComponent from "./cardComponent";
import { Wallet, Send, List } from "lucide-react";
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [firstname, setFirstname] = useState("User");
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await fetch(`${baseBackendUrl}/account/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setBalance(data.balance);
    setFirstname(data.firstname);
  };

  useEffect(() => {
    getData();
  }, [balance]);

  const handleViewTransactions = () => {
   navigate("/transaction")
  };

  const handleSendMoney = () => {
    navigate("/user")
  };

  const handleLogout = () => {
    localStorage.clear();
    
    navigate("/sign-in",{replace:true});
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

  return (
    <div className="min-h-screen bg-custom-black text-custom-purple">
      {/* Navigation */}
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

      {/* Main Section */}
      <main className="lg:px-10 m-10 ">
        
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
          <CardComponent
            title="Available Balance"
            icon={Wallet}
            content={`$${Math.round(balance)}`}
          />

          <CardComponent
            title="View Transactions"
            icon={List}
            buttonLabel="View Transactions"
            onClick={handleViewTransactions}
          />

          <CardComponent
            title="Send Money"
            icon={Send}
            buttonLabel="Send Money"
            onClick={handleSendMoney}
          />
        </div>
        
      </main>
    </div>
  );
}
