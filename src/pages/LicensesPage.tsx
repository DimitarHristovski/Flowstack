import { useEffect } from 'react';

export default function LicensesPage() {
  useEffect(() => {
    document.title = 'Licenses | AgentHub';
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Open Source Licenses</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          AgentHub uses several open source packages. We'd like to thank the developers of these projects:
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">React</h2>
            <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
              <p className="text-surface-600 dark:text-surface-400 mb-4">MIT License</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Copyright (c) Meta Platforms, Inc. and affiliates.
              </p>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions...
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">Tailwind CSS</h2>
            <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
              <p className="text-surface-600 dark:text-surface-400 mb-4">MIT License</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Copyright (c) Tailwind Labs, Inc.
              </p>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction...
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">Framer Motion</h2>
            <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
              <p className="text-surface-600 dark:text-surface-400 mb-4">MIT License</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Copyright (c) 2020 Framer B.V.
              </p>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction...
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">i18next</h2>
            <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
              <p className="text-surface-600 dark:text-surface-400 mb-4">MIT License</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Copyright (c) 2022 i18next
              </p>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction...
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">Lucide React</h2>
            <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
              <p className="text-surface-600 dark:text-surface-400 mb-4">ISC License</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Copyright (c) 2020, Lucide Contributors
              </p>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-4">
                Permission to use, copy, modify, and/or distribute this software for any
                purpose with or without fee is hereby granted, provided that the above
                copyright notice and this permission notice appear in all copies...
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">Contact</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            If you have any questions about our use of open source software or would like to view the complete licenses, please contact us at:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400">
            <li>Email: legal@agenthub.ai</li>
            <li>Address: 123 AI Street, Tech City, TC 12345</li>
          </ul>
        </section>
      </div>
    </div>
  );
}