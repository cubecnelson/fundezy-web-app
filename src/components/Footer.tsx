export const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8">
        <nav className="flex flex-wrap justify-center space-x-6" aria-label="Footer">
          <a href="/about" className="text-sm text-gray-400 hover:text-fundezy-red">About</a>
          <a href="/investor-relations" className="text-sm text-gray-400 hover:text-fundezy-red">Investor Relations</a>
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
        <p className="mt-8 text-center text-sm text-gray-400">
          &copy; 2025 Fundezy PropTrade, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};