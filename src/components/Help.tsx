'use client';
import Button from '@/ui/Button';
import {ShieldQuestion} from 'lucide-react';

function Help() {
  return (
    <Button className="fixed right-14 md:right-4 bottom-4">
      <ShieldQuestion className="size-4 md:size-5 lg:size-6" />
    </Button>
  );
}

export default Help;
