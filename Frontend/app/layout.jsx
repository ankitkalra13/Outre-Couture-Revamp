
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/components/providers/ReduxProvider';

export const metadata = {
  title: 'Outre Couture - Builder of a Better Fashion World',
  description: 'Outre Couture is a global fashion support company offering design, manufacturing, and worldwide shipping solutions for lifestyle brands, with headquarters in India and a marketing office in the UK',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}