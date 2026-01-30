import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button asChild size="lg" className="text-6xl font-bold p-16 h-auto rounded-2xl">
        <Link href="/dashboard">
          OPEN
        </Link>
      </Button>
    </div>
  );
}
