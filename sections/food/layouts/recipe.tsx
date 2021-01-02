import { ReactNode } from 'react';
import { Main } from '@madebyconnor/bamboo-ui';

import Navigation from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { UnitSystemProvider } from '../components/UnitSystemContext';

interface RecipeLayoutProps {
  children: ReactNode;
  variant: 'sidebar' | null;
}

export function RecipeLayout({
  children,
  variant = 'sidebar',
}: RecipeLayoutProps) {
  return (
    <UnitSystemProvider>
      <Navigation variant={variant} />
      <Main variant={variant}>{children}</Main>
      <Footer variant={variant} />
    </UnitSystemProvider>
  );
}
