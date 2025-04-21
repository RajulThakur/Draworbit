'use client';
import Hamburger from '@/components/Hamburger';
import Help from '@/components/Help';
import MainNav from '@/components/MainNav';
import ShareBtn from '@/components/Share';
import Zoom_Undo from '@/components/Zoom_Undo';
import {ColorProvider} from '@/context/colorContext';
import {CursorProvider} from '@/context/cursorContext';
import {DataProvider} from '@/context/dataContext';
import {ReactNode} from 'react';

function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <>
      <ColorProvider>
        <CursorProvider>
          <DataProvider>
            <MainNav />
            {children}
          </DataProvider>
          <Zoom_Undo />
        </CursorProvider>
        <Hamburger />
        <ShareBtn />
        <Help />
      </ColorProvider>
    </>
  );
}

export default DashboardLayout;
