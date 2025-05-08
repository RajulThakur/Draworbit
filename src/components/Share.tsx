'use client';
import Button from '@/ui/Button';
import {Share} from 'lucide-react';

function ShareBtn() {
  return (
    <Button className="top-4 left-4 hidden md:flex md:fixed">
      <Share className="size-4 md:size-5 lg:size-6" />
    </Button>
  );
}

export default ShareBtn;
