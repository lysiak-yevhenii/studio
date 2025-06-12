
import Header from '@/components/layout/header';
import FloatingVerticalNav from '@/components/layout/floating-vertical-nav';
import FloatingVerticalNavRight from '@/components/layout/floating-vertical-nav-right';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <FloatingVerticalNav /> 
      <FloatingVerticalNavRight />
      <main className="flex-grow container mx-auto py-6 px-4">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} ProNetwork. All rights reserved.
      </footer>
    </div>
  );
}
