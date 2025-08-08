import React from "react";
import Bio from "../components/bio";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const buttonClass =
    "min-w-[200px] text-white shadow-xl text-lg hover:scale-105 transform";
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Bio
        name="Raj Gupta"
        role="Full Stack Software Developer"
        about="Passionate about building scalable web applications and solving challenging problems."
      />
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <Button
          onClick={() =>
            window.open("https://www.linkedin.com/in/rajg1110", "_blank")
          }
          className={buttonClass + " bg-blue-700"}
        >
          Visit LinkedIn
        </Button>

        <Button
          onClick={() => navigate("/products")}
          className={buttonClass + " bg-green-600"}
        >
          View Products
        </Button>

        <Button
          onClick={() => navigate("/segments")}
          className={buttonClass + " bg-purple-600"}
        >
          Segment Evaluator
        </Button>
      </div>
    </div>
  );
};

export default Home;
