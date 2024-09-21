import { useRecoilValue } from "recoil"
import { transfererUser } from "../sources/atoms/sendUserAtom"
import { baseBackendUrl } from "../../shared/urls"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Card component
const Card = ({ title, content, buttonLabel, onClose }) => (
    <div className="bg-custom-purple text-custom-white rounded-lg p-7 flex flex-col gap-5 max-w-md w-full">
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

export default function SendMoney(){
    const navigate = useNavigate()
    const getTransfererUser = useRecoilValue(transfererUser)
    const [amount, setAmount] = useState(0)
    const [showCard, setShowCard] = useState(false)
    const [cardMessage, setCardMessage] = useState("")

    const fetchSendMoney = async ()=>{
        if(amount == 0){
            setCardMessage("Amount Can't be empty")
            setShowCard(true)
            return;
        }
        const response = await fetch(`${baseBackendUrl}/transaction/send`, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                to:getTransfererUser[0],
                amount
            })
        });
        const data = await response.json()
        console.log(data)
        setCardMessage(data.msg)
        setShowCard(true)
    }

    const handleCloseCard = () => {
        setShowCard(false)
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen bg-custom-black text-custom-purple">
            <div className="flex items-center justify-center h-screen">
                <div className="bg-custom-purple text-custom-white rounded-lg p-7 flex flex-col gap-5">
                    <div className="text-4xl font-bold flex justify-center ">Send Money</div>
                    <div className="flex flex-col ">
                        <div className="text-xl font-bold">{getTransfererUser[1]}</div>
                        <input 
                            type="text" 
                            className="w-full rounded-lg bg-custom-white text-custom-teal p-2 mt-2 outline-none" 
                            placeholder="Enter amount"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button 
                        className="bg-custom-yellow hover:bg-custom-indigo text-custom-black py-2 px-4 rounded-lg font-bold"
                        onClick={fetchSendMoney}
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
            {showCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Card
                        title="Transaction Status"
                        content={cardMessage}
                        buttonLabel="Close"
                        onClose={handleCloseCard}
                    />
                </div>
            )}
        </div>
    )
}