import { NavbarType } from "@/Type/navbarType";
import { createContext, ReactNode, useContext, useState } from "react";

const cursorContext = createContext<{
  cursor: NavbarType;
  setCursor: (cursor: NavbarType) => void;
}>({ cursor: "hand", setCursor: () => {} });
export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<NavbarType>("hand");
  return (
    <cursorContext.Provider value={{ cursor, setCursor }}>
      {children}
    </cursorContext.Provider>
  );
}
export function useCursor() {
  if (!cursorContext)
    throw new Error("useCursor must be used within a CursorProvider");
  const context = useContext(cursorContext);
  return context;
}
