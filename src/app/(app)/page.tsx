'use client';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  return (
    <Link href="/app">
      <div className="relative z-50 h-dvh w-dvw bg-transparent">
        <div className="absolute top-15 left-5 hidden size-24 md:block">
          <Image
            fill
            className="object-contain dark:invert"
            alt="arrow"
            src={'/arrow/share.png'}
          />
        </div>
        <div className="absolute right-5 bottom-5 hidden size-24 md:top-15 md:right-5 md:block">
          <Image
            fill
            className="object-contain dark:invert"
            alt="menu"
            src={'/arrow/menu.png'}
          />
        </div>
        <div className="absolute right-2 bottom-12 size-24 md:hidden">
          <Image
            fill
            className="object-contain dark:invert"
            alt="menu"
            src={'/arrow/menu_rev.svg'}
          />
        </div>
        <div className="absolute bottom-10 left-15 size-24 md:bottom-15">
          <Image
            fill
            className="object-contain dark:invert"
            alt="zoom"
            src={'/arrow/zoom.png'}
          />
        </div>
        <div className="absolute bottom-15 left-35 hidden size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="undo"
            src={'/arrow/undo.png'}
          />
        </div>
        <div className="absolute bottom-5 left-80 hidden size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="redo"
            src={'/arrow/redo.png'}
          />
        </div>
        <div className="absolute right-20 bottom-4 size-24 md:right-15 md:bottom-7">
          <Image
            fill
            className="object-contain dark:invert"
            alt="arrow"
            src={'/arrow/help.png'}
          />
        </div>
      </div>
    </Link>
  );
}

export default Home;
