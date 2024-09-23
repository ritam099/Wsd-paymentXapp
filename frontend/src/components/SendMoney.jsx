import { useRecoilValue } from "recoil";
import { transfererUser } from "../sources/atoms/sendUserAtom";
import { baseBackendUrl } from "../../shared/urls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

// Card component
const Card = ({ title, content, buttonLabel, onClose }) => (
    <div className="bg-custom-purple text-custom-white rounded-lg p-7 flex flex-col gap-5 max-w-md w-full card-enter">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg">{content}</p>
        <button 
            onClick={onClose}
            className="bg-custom-yellow hover:bg-custom-indigo text-custom-black py-2 px-4 rounded-lg font-bold"
        >
            {buttonLabel}
        </button>
    </div>
);

export default function SendMoney() {
    const navigate = useNavigate();
    const getTransfererUser = useRecoilValue(transfererUser);
    const [amount, setAmount] = useState(0);
    const [showCard, setShowCard] = useState(false);
    const [cardMessage, setCardMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const fetchSendMoney = async () => {
        if (amount <= 0) {
            setCardMessage("Amount must be greater than zero");
            setShowCard(true);
            return;
        }
        
        setLoading(true); 

        try {
            const response = await fetch(`${baseBackendUrl}/transaction/send`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    to: getTransfererUser[0],
                    amount
                })
            });

            // Log the response for debugging
            console.log('Response Status:', response.status);
            const data = await response.json();
            console.log('Response Data:', data); // Log the data

            alert("Transaction complete");
            if (!response.ok) {
                throw new Error(data.msg || "Something went wrong");
            }

            setCardMessage(data.msg);
            navigate("/dashboard",{replace: true})
        } catch (error) {
            setCardMessage(error.message || "An error occurred. Please try again.");
        } finally {
            setShowCard(true);
            setLoading(false); 
        }
    };

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0 : value); // Set to 0 if the input is not a valid number
    };

    const handleCloseCard = () => {
        setShowCard(false);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-custom-black text-custom-purple">
            <div className="flex items-center justify-center h-screen">
                <div className="bg-custom-purple text-custom-white rounded-lg p-7 flex flex-col gap-5">
                    <div className="text-4xl font-bold flex justify-center">Send Money</div>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">{getTransfererUser[1]}</div>
                        <input 
                            type="text" 
                            className="input-animation w-full rounded-lg bg-custom-white text-custom-teal p-2 mt-2 outline-none" 
                            placeholder="Enter amount"
                            onChange={handleAmountChange}
                        />
                    </div>
                    <button 
                        className={`button-animation bg-custom-yellow hover:bg-custom-indigo text-custom-black py-2 px-4 rounded-lg font-bold ${loading ? 'ripple' : ''}`}
                        onClick={fetchSendMoney}
                        disabled={loading} 
                    >
                        {loading ? "Sending..." : "Initiate Transfer"}
                    </button>
                </div>
            </div>
            {showCard && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center card-enter`}>
                    <Card
                        title="Transaction Status"
                        content={cardMessage}
                        buttonLabel="Close"
                        onClose={handleCloseCard}
                    />
                </div>
            )}
        </div>
    );
}
