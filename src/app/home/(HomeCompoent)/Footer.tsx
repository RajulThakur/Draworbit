import Logo from '@/components/Logo';
import {links} from '@/constants/links';
import {Github, LinkedinIcon, Twitter} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo showText={true} />
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            DrawOrbit is your all-in-one digital whiteboard. Sketch, share, and
            collaborate in real-time anytime, anywhere.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={links.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="sr-only">GitHub</span>
              <Github />
            </a>
            <a
              href={links.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="sr-only">Twitter</span>
              <Twitter />
            </a>
            <a
              href={links.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="sr-only">LinkedIn</span>
              <LinkedinIcon />
            </a>
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
            Company
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href={links.company.about}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a
                href={links.company.contact}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
            Legal
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href={links.legal.privacy}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href={links.legal.terms}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href={links.legal.cookies}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8">
        <p className="text-base text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} DrawOrbit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
