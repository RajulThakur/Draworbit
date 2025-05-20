'use client';

import DemoCanvas from './home/(HomeCompoent)/DemoCanvas';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0">
        <DemoCanvas />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-6xl font-bold text-indigo-600 sm:text-7xl md:text-8xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">
          Page Not Found
        </h2>
        <p className="max-w-md text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Go back home
        </Link>
      </div>
    </div>
  );
}
