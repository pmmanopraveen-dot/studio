import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="font-headline">View Your Results</CardTitle>
                    <CardDescription>
                        The results, including error percentage and charts, are now dynamically generated on the Validation page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">Enter your data on the Validation page and switch to the 'Results' tab to see your analysis.</p>
                    <Button asChild>
                        <Link href="/dashboard/validation">
                            Go to Validation Page <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
