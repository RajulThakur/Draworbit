export default function Demo() {
  return (
    <section
      id="demo"
      className="relative flex w-full items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16"
      style={{minHeight: '60vh'}}>
      <div className="relative aspect-[16/9] w-full max-w-7xl">
        <img
          src="/assets/desktop.png"
          alt="Desktop Mockup"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-110 object-contain"
          style={{filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.08))'}}
        />
        <div className="absolute inset-0 top-[8%] left-[5%] z-10 h-[90%] w-[90%] object-contain">
          <video
            className="pointer-events-none rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg transition-all duration-300 sm:shadow-xl lg:shadow-2xl"
            src="/assets/demo.mov"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
          />
        </div>
      </div>
    </section>
  );
}
