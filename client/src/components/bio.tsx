import React from "react";

interface BioProps {
  name: string;
  role: string;
  about: string;
}

const Bio: React.FC<BioProps> = ({ name, role, about }) => {
  return (
    <div className="max-w-3xl mx-auto text-center p-6">
      <h1 className="text-5xl font-bold">{name}</h1>
      <p className="text-lg text-gray-600 mt-2 break-words">{role}</p>
      <p className="mt-4 break-words">{about}</p>
    </div>
  );
};

export default Bio;
