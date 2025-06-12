
import Header from '@/components/layout/header';
import FloatingVerticalNav from '@/components/layout/floating-vertical-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* FloatingVerticalNav is placed here to be part of the main layout */}
      {/* It's a client component and will manage its own state */}
      <FloatingVerticalNav /> 
      <main className="flex-grow container mx-auto py-6 px-4">
        {/* Add padding-left here if FloatingVerticalNav pushes content, e.g., pl-20 or pl-60 based on its state */}
        {/* For now, it floats over. */}
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} ProNetwork. All rights reserved.
      </footer>
    </div>
  );
}
