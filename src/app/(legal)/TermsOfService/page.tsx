'use static';

import {policies} from '@/constants/policies';

export default function TermsOfService() {
  const {terms} = policies;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-gray-800">
      <h1 className="text-accent-700 mb-6 text-4xl font-bold">{terms.title}</h1>
      <p className="mb-8 text-sm text-gray-500">
        Last updated: {terms.lastUpdated}
      </p>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {terms.acceptance.title}
        </h2>
        <p>{terms.acceptance.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {terms.services.title}
        </h2>
        <p>{terms.services.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {terms.userConduct.title}
        </h2>
        <ul className="list-disc pl-6">
          {terms.userConduct.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {terms.intellectualProperty.title}
        </h2>
        <p>{terms.intellectualProperty.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {terms.termination.title}
        </h2>
        <p>{terms.termination.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {terms.disclaimer.title}
        </h2>
        <p>{terms.disclaimer.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {terms.liability.title}
        </h2>
        <p>{terms.liability.content}</p>
      </section>
    </div>
  );
}
