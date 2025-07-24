import {SizeToPx} from '@/utils/helper/sizeToPx';
import {Dispatch, FocusEventHandler, RefObject, SetStateAction} from 'react';

interface InputProps {
  transformRef: RefObject<{x: number; y: number; scale: number}>;
  handleTextInputBlur: FocusEventHandler<HTMLTextAreaElement>;
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
  const {scale} = transformRef.current;
  return (
    <textarea
      autoFocus
      value={textInput.value}
      onChange={(e) => {
        const height = e.target.scrollHeight;
        const width = e.target.scrollWidth;
        console.log(`h-${height} w-${width}`);
        return setTextInput((prev) => ({...prev, value: e.target.value}));
      }}
      className="fixed z-30 field-sizing-content resize-none rounded-md  bg-transparent shadow-sm focus:outline-none dark:text-white"
      style={{
        fontSize: `${(SizeToPx('md') * scale) / 2}px`,
        lineHeight: `${(SizeToPx('md') / 1.7) * scale}px`,
        left: `${textInput.x}px`,
        top: `${textInput.y}px`,
      }}
      onBlur={handleTextInputBlur}
    />
  );
}
