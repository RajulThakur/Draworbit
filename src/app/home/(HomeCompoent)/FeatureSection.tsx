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
        className="size-6 text-white">
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
        className="size-6 text-white">
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
        className="size-6 text-white">
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
        className="size-6 text-white">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-white dark:bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-100">
            Everything you need
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-slate-50 sm:text-5xl lg:text-balance">
            No server? No problem.
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
            DrawOrbit is a powerful, serverless drawing and collaboration
            platform. Create, annotate, and share your ideas instantly—no setup
            required.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-indigo-100">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 ">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
