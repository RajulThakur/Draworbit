import Hamburger from '@/components/Hamburger';
import Help from '@/components/Help';
import MainNav from '@/components/MainNav';
import ShareBtn from '@/components/Share';
import Zoom_Undo from '@/components/Zoom_Undo';

function DashLayout() {
  return (
    <>
      <MainNav />
      <Hamburger />
      <ShareBtn />
      <Zoom_Undo />
      <Help />
    </>
  );
}

export default DashLayout;
