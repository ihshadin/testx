"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const LogOut = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      // Display success message and redirect to login
      toast.success("Logout successful!");
      router.push("/login"); // Use router navigation for better SPA handling
    } catch (error: any) {
      // Handle errors gracefully
      toast.error(error.message || "An error occurred during logout.");
    }
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
