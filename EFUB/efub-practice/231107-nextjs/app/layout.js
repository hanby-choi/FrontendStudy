import { Roboto, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${notoSansKr.className} ${roboto.variable}`}>
      <body>
        <div className="navbar">
          <Link href="/">홈</Link>
          <br />
          <Link href="/list">List</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
