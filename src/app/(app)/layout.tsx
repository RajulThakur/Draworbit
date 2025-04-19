'use client';
import Hamburger from '@/components/Hamburger';
import Help from '@/components/Help';
import MainNav from '@/components/MainNav';
import ShareBtn from '@/components/Share';
import Zoom_Undo from '@/components/Zoom_Undo';
import {ColorProvider} from '@/context/colorContext';
import {CursorProvider} from '@/context/cursorContext';
import {ReactNode} from 'react';

function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <>
      <ColorProvider>
        <CursorProvider>
          <MainNav />
          {children}
        </CursorProvider>
        <Hamburger />
        <ShareBtn />
        <Zoom_Undo />
        <Help />
      </ColorProvider>
    </>
  );
}

export default DashboardLayout;
