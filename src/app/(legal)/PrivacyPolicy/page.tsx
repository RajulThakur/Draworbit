'use static';
import {policies} from '@/constants/policies';

export default function PrivacyPolicy() {
  const {privacy} = policies;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-gray-800">
      <h1 className="text-accent-700 mb-6 text-4xl font-bold">
        {privacy.title}
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        Last updated: {privacy.lastUpdated}
      </p>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.introduction.title}
        </h2>
        <p>{privacy.introduction.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.dataCollection.title}
        </h2>
        <ul className="list-disc pl-6">
          {privacy.dataCollection.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.dataUsage.title}
        </h2>
        <ul className="list-disc pl-6">
          {privacy.dataUsage.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.cookies.title}
        </h2>
        <p>{privacy.cookies.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.thirdParty.title}
        </h2>
        <p>{privacy.thirdParty.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.security.title}
        </h2>
        <p>{privacy.security.content}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.rights.title}
        </h2>
        <ul className="list-disc pl-6">
          {privacy.rights.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.changes.title}
        </h2>
        <p>{privacy.changes.content}</p>
      </section>

      <section>
        <h2 className="text-accent-700 mb-2 text-2xl font-semibold">
          {privacy.contact.title}
        </h2>
        <p>{privacy.contact.content}</p>
      </section>
    </div>
  );
}
