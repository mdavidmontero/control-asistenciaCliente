import { type ReactNode } from "react";

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="p-3 text-sm font-bold text-center text-red-600 uppercase bg-red-50">
      {children}
    </p>
  );
}
