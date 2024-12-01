import { useState } from "react";

const Review = ({ review }) => {
  const [isHelpful, setIsHelpful] = useState(false);

  console.log(review);

  const { name, title, rating, content, date, avatar } = review;


  return (
    <div className="border-b border-gray-100 py-6">
      <div className="flex items-start gap-4">
        <img src={avatar} alt={`${name}'s avatar`} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{name}</h4>
              <p className="text-sm text-gray-500">{title}</p>
            </div>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-700">{content}</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button
              className={`text-sm ${
                isHelpful ? "text-green-500" : "text-gray-500"
              }`}
              onClick={() => setIsHelpful(!isHelpful)}
            >
              {isHelpful ? "Marked as Helpful" : "Was this review helpful?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
