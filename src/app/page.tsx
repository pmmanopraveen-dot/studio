import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-image-1");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline">Tamil Research Validator</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-8 items-center py-12 md:py-24">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-primary">
              VKP-CFS Research & Validation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A professional platform for civil engineers to validate Cold-Formed Steel structures, blending modern simulation with traditional Tamil cultural aesthetics.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            {heroImage && (
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    data-ai-hint={heroImage.imageHint}
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container py-6 text-center text-muted-foreground">
           © 2024 VKP-CFS. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
