import React from "react";
import { Toaster } from "./components/ui/sonner";

const toastOptions = {
  classNames: {
    toast: "p-2 px-4 rounded-xl font-poppins tracking-wider",
    error: "bg-red-600",
    success: "bg-gray-800 border",
    description: "!text-white",
    warning: "bg-yellow-600 text-gray-100",
    info: "bg-blue-600",
  },
};

export default function Layout({ page }: { page: React.ReactNode }) {
  return (
    <>
      <main>{page}</main>
      <Toaster toastOptions={toastOptions} richColors />
    </>
  );
}
