'use client'
import { useCursor } from "@/context/cursorContext";
import { NavOptions } from "@/Type/navbarType";
import {
  ArrowRight,
  Circle,
  Eraser,
  Hand,
  Image,
  LetterText,
  Pencil,
  RectangleHorizontal,
  TextCursor,
} from "lucide-react";
function MainNav() {
  const options:NavOptions[] = [
    { name: "hand", icon: <Hand strokeWidth={1.69} /> },
    { name: "arrow", icon: <TextCursor strokeWidth={1.69} /> },
    { name: "rectangle", icon: <RectangleHorizontal strokeWidth={1.69} /> },
    { name: "circle", icon: <Circle strokeWidth={1.69} /> },
    { name: "line", icon: <ArrowRight strokeWidth={1.69} /> },
    { name: "draw", icon: <Pencil strokeWidth={1.69} /> },
    { name: "picture", icon: <Image strokeWidth={1.69} /> },
    { name: "text", icon: <LetterText strokeWidth={1.69} /> },
    { name: "eraser", icon: <Eraser strokeWidth={1.69} /> },
  ];
  const { setCursor } = useCursor();
  return (
    <div className="fixed z-10 top-4 right-1/3 left-1/3 flex items-center justify-center space-x-2 rounded-xl bg-gray-100 dark:bg-slate-800 px-6 py-1">
      {options.map((option) => (
        <button
          onClick={() => setCursor(option.name)}
          key={option.name}
          className="flex size-13 flex-col items-center justify-between rounded-md p-2 text-[0.69em] hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {option.icon}
          <span className="capitalize">{option.name}</span>
        </button>
      ))}
    </div>
  );
}

export default MainNav;
