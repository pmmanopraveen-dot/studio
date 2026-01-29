"use client";

import { useState } from "react";
import type { ValidationDataPoint } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import LoadDisplacementChart from "@/components/charts/load-displacement-chart";

// Results Display Component
const ResultsDisplay = ({ labData, feaData }: { labData: ValidationDataPoint[], feaData: ValidationDataPoint[] }) => {
    const calculateError = () => {
        if (labData.length === 0 || feaData.length === 0 || labData.length !== feaData.length) {
            return { averageError: 0, peakLoadError: 0 };
        }

        const peakLabLoad = Math.max(...labData.map(p => p.load));
        const peakFeaLoad = Math.max(...feaData.map(p => p.load));
        const peakLoadError = Math.abs((peakLabLoad - peakFeaLoad) / peakLabLoad) * 100;

        const errors = labData.map((labPoint, index) => {
            const feaPoint = feaData[index];
            if (labPoint.load === 0) return 0;
            return Math.abs((labPoint.load - feaPoint.load) / labPoint.load);
        });

        const averageError = (errors.reduce((a, b) => a + b, 0) / errors.length) * 100;
        return { averageError, peakLoadError };
    };
    
    const { averageError, peakLoadError } = calculateError();
    const isVerified = peakLoadError < 5;

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Load-Displacement Chart</CardTitle>
                        <CardDescription>Visual comparison of Laboratory vs. Abaqus FEA results.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <LoadDisplacementChart labData={labData} feaData={feaData} />
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Error Percentage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Peak Load Error</span>
                            <span className="font-bold text-lg">{peakLoadError.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Average Error</span>
                            <span className="font-bold text-lg">{averageError.toFixed(2)}%</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className={isVerified ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}>
                    <CardHeader>
                        <CardTitle>Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`font-bold text-lg ${isVerified ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                            {isVerified ? "Verified (Error < 5%)" : "Not Verified (Error >= 5%)"}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Data Entry Table Component
const DataTable = ({ title, data, setData }: { title: string, data: ValidationDataPoint[], setData: React.Dispatch<React.SetStateAction<ValidationDataPoint[]>> }) => {
    const handleAddRow = () => {
        setData([...data, { load: 0, displacement: 0 }]);
    };
    const handleRemoveRow = (index: number) => {
        setData(data.filter((_, i) => i !== index));
    };
    const handleInputChange = (index: number, field: 'load' | 'displacement', value: string) => {
        const newData = [...data];
        newData[index][field] = parseFloat(value) || 0;
        setData(newData);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Load (kN)</TableHead>
                            <TableHead>Displacement (mm)</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((point, index) => (
                            <TableRow key={index}>
                                <TableCell><Input type="number" value={point.load} onChange={(e) => handleInputChange(index, 'load', e.target.value)} /></TableCell>
                                <TableCell><Input type="number" value={point.displacement} onChange={(e) => handleInputChange(index, 'displacement', e.target.value)} /></TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveRow(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={handleAddRow} className="mt-4">Add Row</Button>
            </CardContent>
        </Card>
    );
};

export default function ValidationPage() {
    const [labData, setLabData] = useState<ValidationDataPoint[]>([{ load: 0, displacement: 0 }]);
    const [feaData, setFeaData] = useState<ValidationDataPoint[]>([{ load: 0, displacement: 0 }]);

    return (
        <Tabs defaultValue="entry">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-headline tracking-tight">Validation</h1>
                <TabsList>
                    <TabsTrigger value="entry">Data Entry</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent value="entry" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                    <DataTable title="Practical Laboratory Results" data={labData} setData={setLabData} />
                    <DataTable title="Abaqus CAE Simulation Results" data={feaData} setData={setFeaData} />
                </div>
            </TabsContent>
            
            <TabsContent value="results" className="mt-6">
                <ResultsDisplay labData={labData} feaData={feaData} />
            </TabsContent>
        </Tabs>
    );
}
