import {Dispatch, RefObject, SetStateAction} from 'react';

interface InputProps {
  transformRef: RefObject<{x: number; y: number; scale: number}>;
  handleTextInputBlur: () => void;
  textInput: {x: number; y: number; show: boolean; value: string};
  setTextInput: Dispatch<
    SetStateAction<{x: number; y: number; show: boolean; value: string}>
  >;
}
export default function Input({
  transformRef,
  handleTextInputBlur,
  textInput,
  setTextInput,
}: InputProps) {
  return (
    <textarea
      autoFocus
      value={textInput.value}
      onChange={(e) =>
        setTextInput((prev) => ({...prev, value: e.target.value}))
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.currentTarget.blur();
        }
      }}
      className="fixed z-30 rounded-md border border-amber-200 bg-transparent px-4 py-6 text-xl shadow-sm focus:outline-none dark:text-white"
      style={{
        height: `${20 * transformRef.current.scale}px`,
        left: `${(textInput.x - transformRef.current.x) / transformRef.current.scale}px`,
        top: `${(textInput.y - transformRef.current.y) / transformRef.current.scale}px`,
        transform: `scale(${transformRef.current.scale})`,
        transformOrigin: 'top left',
      }}
      onBlur={handleTextInputBlur}
    />
  );
}
