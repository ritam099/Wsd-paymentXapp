import React from "react";
import '../card.css'
export default function CardComponent({ title, icon: Icon, buttonLabel, onClick, content }) {
  return (
    <div 
      style={{ height: "250px" }} 
      className="bg-custom-purple text-custom-white rounded-lg p-14 card-animation"
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon size={30} />}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="text-lg mb-4">{content}</div>
      {buttonLabel && (
        <button
          onClick={onClick}
          style={{ height: "100px", fontSize: "1.6rem" }}
          className="bg-custom-yellow hover:bg-custom-indigo text-custom-black py-2 px-4 rounded-lg w-full button-animation"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
