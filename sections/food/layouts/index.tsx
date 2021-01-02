import { ReactNode } from 'react';
import { Main } from '@madebyconnor/bamboo-ui';

import Navigation from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { UnitSystemProvider } from '../components/UnitSystemContext';

interface FoodLayoutProps {
  children: ReactNode;
}

export function FoodLayout({ children }: FoodLayoutProps) {
  return (
    <UnitSystemProvider>
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </UnitSystemProvider>
  );
}
