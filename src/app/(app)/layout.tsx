'use client';
import MainNav from '@/components/MainNav';
import OptionMenu from '@/components/OptionMenu/OptionMenu';
import Zoom_Undo from '@/components/Zoom_Undo';
import { ColorProvider } from '@/context/colorContext';
import { CursorProvider } from '@/context/cursorContext';
import { DataProvider } from '@/context/dataContext';
import { SelectionProvider } from '@/context/selectionContext';
import { ReactNode } from 'react';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ColorProvider>
        <CursorProvider>
          <DataProvider>
            <SelectionProvider>
              <MainNav />
              <OptionMenu />
              {children}
            </SelectionProvider>
          </DataProvider>
          <Zoom_Undo />
        </CursorProvider>
        {/* <Hamburger /> */}
        {/* <ShareBtn /> */}
        {/* <Help /> */}
      </ColorProvider>
    </>
  );
}

export default DashboardLayout;
