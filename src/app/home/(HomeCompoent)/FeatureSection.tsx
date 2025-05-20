const features = [
  {
    name: 'Real-time Collaboration',
    description:
      'Work together with your team or classmates on the same canvas, live. See changes instantly and boost productivity.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8 text-indigo-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: 'Intuitive Drawing Tools',
    description:
      'Draw rectangles, circles, lines, arrows, diamonds, and freehand with ease. Perfect for diagrams, notes, and sketches.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8 text-indigo-600">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
        />
      </svg>
    ),
  },
  {
    name: 'Text & Annotation',
    description:
      'Add text anywhere on your canvas to annotate, explain, or highlight important points. Great for brainstorming and teaching.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8 text-indigo-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    ),
  },
  {
    name: 'Cloud Save & Export',
    description:
      'Save your work securely in the cloud or export your drawings as images for use in documents, slides, or sharing online.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8 text-indigo-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
  {
    name: 'Undo, Redo & History',
    description:
      'Never lose your progress. Use undo, redo, and view your drawing history to keep your creative flow uninterrupted.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8 text-indigo-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19V5m7 7H5"
        />
      </svg>
    ),
  },
  {
    name: 'Responsive & Accessible',
    description:
      'Enjoy a smooth experience on any device. DrawOrbit is fully responsive and accessible, supporting both mouse and touch input.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8 text-indigo-600">
        <circle
          cx="12"
          cy="12"
          r="10"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h8"
        />
      </svg>
    ),
  },
];

export default function FeatureSection() {
  return (
    <section
      className="relative py-24 sm:py-32"
      id="features">
      <div className="mx-auto flex flex-col items-center px-2 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base leading-7 font-semibold text-indigo-600">
            Everything you need
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            No server? No problem.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            DrawOrbit is a powerful, serverless drawing and collaboration
            platform. Create, annotate, and share your ideas instantly—no setup
            required.
          </p>
        </div>
        {/* Centered Big Image with Blur at Bottom */}
        <div className="relative mt-16 flex w-full justify-center">
          <img
            src="/assets/view.png"
            alt="App screenshot"
            className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
            style={{objectFit: 'cover'}}
          />
          {/* Blur effect at the bottom of the image */}
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 rounded-b-xl"
            style={{
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 80%, #fff 100%)',
              filter: 'blur(8px)',
            }}
          />
        </div>
        {/* Features Grid */}
        <div className="mt-20 w-full">
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative flex flex-col items-center px-4 text-center">
                <dt className="mb-2 flex items-center justify-center text-lg leading-7 font-semibold text-gray-900">
                  <span className="mr-2">{feature.icon}</span>
                  {feature.name}
                </dt>
                <dd className="text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
