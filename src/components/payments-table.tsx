import * as React from "react"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const payments = [
    {
        id: "1",
        status: "Success",
        email: "ken99@yahoo.com",
        amount: "$316.00",
    },
    {
        id: "2",
        status: "Success",
        email: "abe45@gmail.com",
        amount: "$242.00",
    },
    {
        id: "3",
        status: "Processing",
        email: "monserrat44@gmail.com",
        amount: "$837.00",
    },
    {
        id: "4",
        status: "Success",
        email: "silas22@gmail.com",
        amount: "$874.00",
    },
    {
        id: "5",
        status: "Failed",
        email: "carmella@hotmail.com",
        amount: "$721.00",
    },
]

export default function PaymentsTable() {
    const [selectedRows, setSelectedRows] = React.useState<string[]>([])

    const toggleRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedRows((prev) =>
            prev.length === payments.length ? [] : payments.map((payment) => payment.id)
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4 p-4 bg-black text-white">
            <div>
                <h1 className="text-2xl font-bold">Payments</h1>
                <p className="text-sm text-gray-400">Manage your payments.</p>
            </div>
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Filter emails..."
                    className="max-w-sm bg-gray-800 border-gray-700 text-white"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-gray-800 border-gray-700 text-white">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 text-white">
                        <DropdownMenuItem>Status</DropdownMenuItem>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Amount</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="border border-gray-700 rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">
                                <Checkbox
                                    checked={selectedRows.length === payments.length}
                                    onCheckedChange={toggleAll}
                                />
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="w-[40px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(payment.id)}
                                        onCheckedChange={() => toggleRow(payment.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${payment.status === "Success"
                                                ? "bg-green-200 text-green-800"
                                                : payment.status === "Processing"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : "bg-red-200 text-red-800"
                                            }`}
                                    >
                                        {payment.status}
                                    </span>
                                </TableCell>
                                <TableCell>{payment.email}</TableCell>
                                <TableCell className="text-right">{payment.amount}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-gray-800 text-white">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Download receipt</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {selectedRows.length} of {payments.length} row(s) selected.
                </p>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white">
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}