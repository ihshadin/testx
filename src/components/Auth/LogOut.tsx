"use client";
import { Logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogOut = async () => {
    dispatch(Logout());
    router.push("/login");
  };

  return (
    <div>
      <button
        onClick={() => handleLogOut()}
        className={`bg-white hover:bg-primary/5 text-primary border border-primary/30 hover:border-primary/60 px-5 py-1.5 rounded-xl transition duration-150`}
      >
        Logout
      </button>
    </div>
  );
};

export default LogOut;
