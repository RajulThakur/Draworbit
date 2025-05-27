'use client';
import Button from '@/ui/Button';
import {ShieldQuestion} from 'lucide-react';

function Help() {
  return (
    <Button className="fixed right-14 bottom-4 md:bottom-4 md:right-4">
      <ShieldQuestion className="stroke-foreground size-4 md:size-5 lg:size-6 dark:stroke-white" />
    </Button>
  );
}

export default Help;
