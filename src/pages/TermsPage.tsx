import { useEffect } from "react";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service | FlowStack";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">
        Terms of Service
      </h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          Last updated: March 15, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            1. Agreement to Terms
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            By accessing or using FlowStack, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            2. Use License
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Permission is granted to temporarily access and use FlowStack for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 mb-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>
              Attempt to decompile or reverse engineer any software contained on
              FlowStack
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li>
              Transfer the materials to another person or "mirror" the materials
              on any other server
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            3. Disclaimer
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            The materials on FlowStack are provided on an 'as is' basis.
            FlowStack makes no warranties, expressed or implied, and hereby
            disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            4. Limitations
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            In no event shall FlowStack or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use FlowStack, even if FlowStack or an authorized
            representative has been notified orally or in writing of the
            possibility of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            5. Accuracy of Materials
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            The materials appearing on FlowStack could include technical,
            typographical, or photographic errors. FlowStack does not warrant
            that any of the materials on its website are accurate, complete, or
            current. FlowStack may make changes to the materials contained on
            its website at any time without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            6. Links
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            FlowStack has not reviewed all of the sites linked to its website
            and is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by FlowStack of the
            site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            7. Modifications
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            FlowStack may revise these terms of service for its website at any
            time without notice. By using this website you are agreeing to be
            bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
            8. Governing Law
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            These terms and conditions are governed by and construed in
            accordance with the laws and you irrevocably submit to the exclusive
            jurisdiction of the courts in that location.
          </p>
        </section>
      </div>
    </div>
  );
}
