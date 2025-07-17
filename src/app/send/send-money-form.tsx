'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import { getPayeeSuggestions } from './actions';

const formSchema = z.object({
  payee: z.string().min(2, {
    message: 'Payee must be at least 2 characters.',
  }),
  amount: z.coerce.number().positive({
    message: 'Please enter a valid amount.',
  }),
  note: z.string().optional(),
});

export function SendMoneyForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [payeeQuery, setPayeeQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const debouncedPayeeQuery = useDebounce(payeeQuery, 300);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payee: '',
      amount: 0,
      note: '',
    },
  });

  useEffect(() => {
    if (debouncedPayeeQuery.length > 1) {
      setIsFetchingSuggestions(true);
      startTransition(async () => {
        const result = await getPayeeSuggestions(debouncedPayeeQuery);
        setSuggestions(result);
        setIsFetchingSuggestions(false);
      });
    } else {
      setSuggestions([]);
    }
  }, [debouncedPayeeQuery]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        toast({
          title: 'Payment Successful',
          description: `You sent ${values.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })} to ${values.payee}.`,
          variant: 'default',
          className: 'bg-accent text-accent-foreground border-accent',
        });
        router.push('/');
      }, 1000);
    });
  }

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('payee', suggestion);
    setSuggestions([]);
    setPayeeQuery('');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name, phone, or UPI ID"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setPayeeQuery(e.target.value);
                  }}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isFetchingSuggestions && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Getting suggestions...</span>
          </div>
        )}
        {suggestions.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant="outline"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    className="pl-7 text-2xl font-bold"
                    step="0.01"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="What's this for?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Pay
        </Button>
      </form>
    </Form>
  );
}
