import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { materialMatrixData } from "@/lib/data";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { Database } from "lucide-react";
  
  export default function MaterialMatrixPage() {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Database className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline">Material Matrix</CardTitle>
              <CardDescription>
                Manage specific design members and their material properties for Cold-Formed Steel.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member Name</TableHead>
                  <TableHead className="text-right">Thickness (mm)</TableHead>
                  <TableHead className="text-right">Yield Strength (MPa)</TableHead>
                  <TableHead className="text-right">Web Height (mm)</TableHead>
                  <TableHead className="text-right">Flange Width (mm)</TableHead>
                  <TableHead className="text-right">Lip Length (mm)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialMatrixData.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="text-right">{member.thickness.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{member.yieldStrength}</TableCell>
                    <TableCell className="text-right">{member.webHeight}</TableCell>
                    <TableCell className="text-right">{member.flangeWidth}</TableCell>
                    <TableCell className="text-right">{member.lipLength}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
  