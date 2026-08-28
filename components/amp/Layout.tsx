import type { ReactNode } from 'react';
import { SITE } from '@/lib/config';
import './style.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="amp-layout">
      {children}
    </div>
  );
}
