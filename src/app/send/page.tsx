'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SendMoneyForm } from './send-money-form';
import { useEffect, useState } from 'react';

export default function SendMoneyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col border-x bg-background">
      <header className="flex h-16 items-center border-b p-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="ml-4 text-xl font-bold">Send Money</h1>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        {isClient && <SendMoneyForm />}
      </main>
    </div>
  );
}
