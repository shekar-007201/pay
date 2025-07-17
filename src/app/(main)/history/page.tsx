'use client';

import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { transactions } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/lib/types';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const isSent = transaction.type === 'sent';
  return (
    <Card className="mb-3">
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={transaction.party.avatarUrl} data-ai-hint="person" />
          <AvatarFallback>{transaction.party.avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{transaction.party.name}</p>
          <p className="text-sm text-muted-foreground">{transaction.description}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(transaction.date).toLocaleString()}
          </p>
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-lg font-bold',
            isSent ? 'text-foreground' : 'text-accent'
          )}
        >
          {isSent ? (
            <ArrowUpRight className="h-5 w-5" />
          ) : (
            <ArrowDownLeft className="h-5 w-5" />
          )}
          <span>
            {transaction.amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const TransactionList = ({
  filter,
}: {
  filter: 'all' | 'sent' | 'received';
}) => {
  const filteredTransactions = transactions.filter(
    (tx) => filter === 'all' || tx.type === filter
  );

  if (filteredTransactions.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTransactions.map((tx) => (
        <TransactionItem key={tx.id} transaction={tx} />
      ))}
    </div>
  );
};

export default function HistoryPage() {
  return (
    <div className="p-4 sm:p-6">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </header>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <TransactionList filter="all" />
        </TabsContent>
        <TabsContent value="sent" className="mt-4">
          <TransactionList filter="sent" />
        </TabsContent>
        <TabsContent value="received" className="mt-4">
          <TransactionList filter="received" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
