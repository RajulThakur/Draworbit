import {SizeToPx} from '@/utils/helper/sizeToPx';
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
  const {scale} = transformRef.current;
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
      className="fixed z-30 field-sizing-content resize-none rounded-md border border-amber-200 bg-transparent shadow-sm focus:outline-none dark:text-white"
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
