'use client';
import Button from '@/ui/Button';
import {Share} from 'lucide-react';

function ShareBtn() {
  return (
    <Button className="top-4 left-4 hidden md:fixed md:flex">
      <Share className="stroke-foreground size-4 md:size-5 lg:size-6 dark:stroke-white" />
    </Button>
  );
}

export default ShareBtn;
