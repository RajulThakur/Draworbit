'use static'
import Demo from './Demo';
import FeatureSection from './FeatureSection';
import Footer from './Footer';
import IntroSection from './IntroSection';
import Navabar from './Navabar';

const Supercharged = () => {
  return (
    <section className="relative flex h-dvh w-dvw snap-start snap-always items-center justify-center">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 22.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 37.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="from-accent-300 relative left-[calc(70%-6rem)] aspect-1155/678 w-[56.125rem] -translate-x-1/2 translate-y-1/2 rotate-[75deg] bg-linear-to-tr to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}></div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-start text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Organise
          </h1>
          <p>Oraganise the</p>
        </div>
      </div>
      <h2 className="items-center text-center text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl md:text-8xl dark:text-foreground">
        Your Workflow
        <br />
        <span className="from-accent-600 to-accent-0 animate-charging bg-gradient-to-r text-[#9089fc] dark:text-[#a29dff]">
          Supercharged
        </span>
      </h2>
    </section>
  );
};

export default function Home() {
  return (
    <div className="h-dvh overflow-scroll">
      <Navabar />
      <IntroSection />
      <FeatureSection/>
      <Supercharged />
      <Demo />
      <div className="relative">
        <div className="from-accent-50/30 absolute inset-0 bg-gradient-to-b to-white dark:bg-none "></div>
        <Footer />
      </div>
    </div>
  );
}
