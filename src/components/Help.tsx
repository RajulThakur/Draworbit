import {ShieldQuestion} from 'lucide-react';

function Help() {
  return (
    <div className="fixed right-4 bottom-4 rounded-xl bg-purple-300 p-3 transition-all hover:bg-purple-200 dark:bg-slate-800 dark:hover:bg-slate-700">
      <ShieldQuestion />
    </div>
  );
}

export default Help;
