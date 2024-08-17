import React from "react";
import { Toaster } from "./components/ui/sonner";

const toastOptions = {
  classNames: {
    error: "bg-red-600",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-gray-100",
    info: "bg-blue-600",
  },
};

export default function Layout({ page }: { page: React.ReactNode }) {
  return (
    <>
      <main>{page}</main>
      <Toaster toastOptions={toastOptions} />
    </>
  );
}
