'use static';
import {policies} from '@/constants/policies';

export default function CookiePolicy() {
  const {cookies} = policies;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-gray-800">
      <h1 className="text-accent-700 mb-6 text-4xl font-bold">
        {cookies.title}
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        Last updated: {cookies.lastUpdated}
      </p>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {cookies.introduction.title}
        </h2>
        <p>{cookies.introduction.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {cookies.types.title}
        </h2>
        <div className="space-y-4">
          {cookies.types.items.map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {cookies.management.title}
        </h2>
        <p>{cookies.management.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {cookies.thirdParty.title}
        </h2>
        <p>{cookies.thirdParty.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {cookies.updates.title}
        </h2>
        <p>{cookies.updates.content}</p>
      </section>
    </div>
  );
}
