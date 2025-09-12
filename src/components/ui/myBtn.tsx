import { User } from "lucide-react";

const MyLoginBtn = () => {
  return (
    <button
      className="
        px-4 py-2 rounded-full 
        flex items-center gap-1.5
        cursor-pointer
        text-secondary
        bg-primary
        shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        
        transition-all
        duration-300

        hover:text-primary
        hover:bg-secondary
      "
    >
      <User className="w-4 h-4" />
      <span className="">Log In</span>
    </button>
  );
};

export default MyLoginBtn;
