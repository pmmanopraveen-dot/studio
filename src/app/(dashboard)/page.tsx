"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Database, TestTubeDiagonal, BarChart3, BookOpen } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Material Matrix",
    description: "Manage design members and their material properties.",
    icon: <Database className="h-8 w-8 text-primary" />,
    href: "/dashboard/material-matrix"
  },
  {
    title: "Validation",
    description: "Compare lab results with Abaqus CAE simulations.",
    icon: <TestTubeDiagonal className="h-8 w-8 text-primary" />,
    href: "/dashboard/validation"
  },
  {
    title: "Results",
    description: "Calculate error percentage and visualize data.",
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    href: "/dashboard/results"
  },
  {
    title: "Knowledge Hub",
    description: "Access research papers and code books.",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    href: "/dashboard/knowledge-hub"
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome, {user?.displayName?.split(' ')[0] || 'Researcher'}!
        </h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your validation toolkit.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title}>
            <Card className="h-full hover:bg-card/80 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
