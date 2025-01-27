import React from "react";

const OpenGmail: React.FC = () => {
  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className="h-[420px] flex items-center justify-center">
      <div className="max-w-xl w-full h-80 px-6 py-8 flex items-center justify-center flex-col gap-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-slate-900 text-2xl font-bold text-center">
          Verify Your Account by Opening Gmail.
        </h1>
        <button
          onClick={handleOpenGmail}
          className="w-40 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out duration-200"
        >
          Open Gmail
        </button>
      </div>
    </div>
  );
};

export default OpenGmail;
