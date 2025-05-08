export const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8">
        <nav className="flex flex-wrap justify-center space-x-6" aria-label="Footer">
          <a href="/about" className="text-sm text-gray-400 hover:text-fundezy-red">About</a>
          {/* <a href="/investor-relations" className="text-sm text-gray-400 hover:text-fundezy-red">Investor Relations</a> */}
          <a href="/how-it-works" className="text-sm text-gray-400 hover:text-fundezy-red">How It Works</a>
          <a href="/pricing" className="text-sm text-gray-400 hover:text-fundezy-red">Pricing</a>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="https://t.me/+UNeJtf7TC_VjZjJl]" target="_blank" className="text-gray-400 hover:text-fundezy-red">
            <span className="sr-only">Telegram</span>
            <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5678 2.9236C16.5678 2.9236 18.1218 2.3176 17.9923 3.7893C17.9492 4.3953 17.5606 6.5163 17.2585 8.8105L16.2224 15.6064C16.2224 15.6064 16.1361 16.6019 15.3589 16.7751C14.5819 16.9482 13.4163 16.1691 13.2005 15.9959C13.0278 15.8661 9.9627 13.9182 8.8834 12.9659C8.5813 12.7062 8.2359 12.1868 8.9266 11.5808L13.4595 7.2522C13.9775 6.7328 14.4956 5.5208 12.337 6.9925L6.2932 11.1046C6.2932 11.1046 5.6025 11.5375 4.3074 11.1479L1.5014 10.2822C1.5014 10.2822 0.4653 9.633 2.2353 8.9836C6.5523 6.9492 11.8622 4.8714 16.5678 2.9236Z" />
            </svg>
          </a>
          <a href="mailto:team@fundezy.io" className="text-gray-400 hover:text-fundezy-red">
            <span className="sr-only">Email</span>
            <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </a>
        </div>
        <nav className="mt-4 flex flex-wrap justify-center space-x-6" aria-label="Legal">
          <a href="https://firebasestorage.googleapis.com/v0/b/fundezy-app.firebasestorage.app/o/Fundezy_Challenge_TNC%20-%2020250415v2.docx.pdf?alt=media&token=f0b97d92-5858-462e-802d-3b2bb3d6bb11" target="_blank" className="text-sm text-gray-400 hover:text-fundezy-red">Challenge Terms and Condition</a>
          <a href="https://firebasestorage.googleapis.com/v0/b/fundezy-app.firebasestorage.app/o/Fundezy_Conditions_for_Use_of_Website_20250414v3.docx.pdf?alt=media&token=ba950705-95b6-4aca-93a9-0d7516920d39" target="_blank" className="text-sm text-gray-400 hover:text-fundezy-red">Conditions for Use of Website</a>
          <a href="https://firebasestorage.googleapis.com/v0/b/fundezy-app.firebasestorage.app/o/Fundezy_Disclaimers%20and%20Legal%20Information%20-%2020250414.docx.pdf?alt=media&token=336ef562-374b-472d-bc48-33bca2c2e627" target="_blank" className="text-sm text-gray-400 hover:text-fundezy-red">Disclaimers and Legal Information</a>
          <a href="https://firebasestorage.googleapis.com/v0/b/fundezy-app.firebasestorage.app/o/Fundezy_PPS%20-%2020250414v3.docx.pdf?alt=media&token=b3c97854-771c-4386-b564-eaf4e031ed5f" target="_blank" className="text-sm text-gray-400 hover:text-fundezy-red">Privacy Policy Statement</a>
        </nav>
        <p className="mt-8 text-center text-sm text-gray-400">
          © 2025 Slashiee Pty Ltd Trading As Fundezy All rights reserved.
        </p>
      </div>
    </footer>
  );
};