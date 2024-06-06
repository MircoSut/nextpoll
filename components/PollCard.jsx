import React from "react";

const PollCard = ({ poll, userNames }) => {
  return (
    <div className="bg-teal-200 mt-4 rounded-lg p-2">
      <div className="information">
        <h3 className="font-bold">
          <strong>{poll.title}</strong>
        </h3>
        <h4>{poll.description}</h4>
      </div>
      <div className="bg-white border-2 rounded-md border-gray-800  p-4 mt-4">
        <div className="p-4 text-gray-900 border-b-2 border-black">
          {poll.question}
        </div>
        {/* Answers */}
        <div className="p-2 mt-2">
          {
            <div>
              {poll.options.map((option) => (
                <div
                  className="text-gray-900 px-4 mb-2 border-2 border-[#d4d4d4] rounded-md cursor-pointer overflow-hidden focus:border-[#8f9fe8]"
                  key={option._id}
                >
                  {option.option_text}
                </div>
              ))}
            </div>
          }
        </div>
        <div className="p-l-4 mt-4 flex justify-between flex-row text-sm">
          <p>Creator: {}</p>
          <p>Total Votes: </p>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
