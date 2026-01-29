"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { researchAction } from './actions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = {
    answer: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Analyzing..." : <>
            <Search className="mr-2 h-4 w-4" /> Analyze and Answer
        </>}
      </Button>
    );
}

function AnswerCard({ answer }: { answer: string }) {
    const { pending } = useFormStatus();
    return (
        <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle>Generated Answer</CardTitle>
                <CardDescription>The AI's response based on the provided context.</CardDescription>
            </CardHeader>
            <CardContent>
                {pending ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                ) : (
                    answer ? (
                        <Alert>
                            <AlertTitle>Analysis Complete</AlertTitle>
                            <AlertDescription className="prose dark:prose-invert">
                                {answer}
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            <p>Your answer will appear here.</p>
                        </div>
                    )
                )}
            </CardContent>
        </Card>
    );
}

export default function KnowledgeHubPage() {
    const [state, formAction] = useFormState(researchAction, initialState);

    return (
        <form action={formAction} className="grid gap-8 md:grid-cols-2">
            <Card className="md:col-span-1">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="font-headline">Knowledge Hub</CardTitle>
                            <CardDescription>
                                Your AI-powered research assistant for Cold-Formed Steel.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="query">Question</Label>
                            <Input id="query" name="query" placeholder="e.g., What is the scope of IS 801?" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="searchResults">Search Results</Label>
                            <Textarea
                                id="searchResults"
                                name="searchResults"
                                placeholder="Paste relevant text from research papers or code books here..."
                                className="min-h-[200px]"
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Provide context from your search for the AI to analyze.
                            </p>
                        </div>
                        <SubmitButton />
                    </div>
                </CardContent>
            </Card>
            <AnswerCard answer={state.answer} />
        </form>
    );
}
