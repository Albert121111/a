import { cn } from '@/lib/utils';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded bg-tiara px-4 py-2 text-white', className)} {...props} />;
}
