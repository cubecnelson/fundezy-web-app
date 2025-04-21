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
            <span className="sr-only">Twitter</span>
            <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
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
          &copy; 2025 Fundezy PropTrade, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};