'use client'
import {Share} from 'lucide-react';

function ShareBtn() {
  return (
    <button className="fixed top-4 left-4 rounded-md border-none bg-blue-200 p-2 dark:bg-slate-800 dark:hover:bg-slate-700">
      <Share />
    </button>
  );
}

export default ShareBtn;
