import { BottomNav } from '@/components/bottom-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col border-x">
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
