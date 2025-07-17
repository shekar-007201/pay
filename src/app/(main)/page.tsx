import Link from 'next/link';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ScanQrCode,
  Landmark,
  ReceiptText,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { transactions, userProfile } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/lib/types';

const QuickAction = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <Button variant="outline" size="icon" className="h-14 w-14 rounded-full bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </Button>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const isSent = transaction.type === 'sent';
  return (
    <div className="flex items-center gap-4 py-3">
      <Avatar>
        <AvatarImage src={transaction.party.avatarUrl} alt={transaction.party.name} data-ai-hint="person" />
        <AvatarFallback>{transaction.party.avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="font-semibold">{transaction.party.name}</p>
        <p className="text-sm text-muted-foreground">{transaction.description}</p>
      </div>
      <div
        className={cn(
          'text-right font-semibold',
          isSent ? 'text-foreground' : 'text-accent'
        )}
      >
        <p>
          {isSent ? '-' : '+'}
          {transaction.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
        <p className="text-xs font-normal text-muted-foreground">
          {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default function HomePage() {
  const recentTransactions = transactions.slice(0, 3);
  return (
    <div className="flex h-full flex-col gap-6 p-4 sm:p-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="person portrait" />
            <AvatarFallback>{userProfile.avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-xl font-bold">{userProfile.name}</h1>
          </div>
        </div>
      </header>

      <Card className="bg-primary text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <p className="text-sm text-primary-foreground/80">Total Balance</p>
          <p className="text-4xl font-bold">
            {userProfile.balance.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button asChild size="lg" className="h-16 text-lg">
          <Link href="/send">
            <ArrowUpRight className="mr-2 h-6 w-6" /> Send Money
          </Link>
        </Button>
        <Button variant="secondary" size="lg" className="h-16 text-lg">
          <ArrowDownLeft className="mr-2 h-6 w-6" /> Receive Money
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <QuickAction icon={ScanQrCode} label="Scan QR" />
        <QuickAction icon={User} label="To Contact" />
        <QuickAction icon={Landmark} label="To Bank" />
        <QuickAction icon={ReceiptText} label="Pay Bills" />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button variant="link" asChild>
            <Link href="/history">View All</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="divide-y p-0">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-6">
                <TransactionItem transaction={tx} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
