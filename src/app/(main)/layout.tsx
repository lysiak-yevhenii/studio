
import UserAvatar from '@/components/auth/user-avatar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow container mx-auto py-6 px-4">
        {children}
      </main>
      
      <div className="fixed bottom-6 right-6 z-50">
        <UserAvatar />
      </div>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} ProNetwork. All rights reserved.
      </footer>
    </div>
  );
}
