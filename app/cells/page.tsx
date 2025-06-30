import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Mock cell data
const mockCells = [
  {
    id: 1,
    name: "Orders Database",
    status: "online"
  },
  {
    id: 2,
    name: "Customer API",
    status: "online"
  },
  {
    id: 3,
    name: "Payment Gateway",
    status: "offline"
  },
  {
    id: 4,
    name: "Inventory System",
    status: "online"
  },
  {
    id: 5,
    name: "Email Service",
    status: "online"
  },
  {
    id: 6,
    name: "Shipping API",
    status: "maintenance"
  }
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 font-sans">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Cells</h1>
          <p className="text-sm text-gray-500">Here you can manage your cells</p>
        </div>
        <div className="flex flex-row gap-2">
          <Button>Add Cell</Button>
        </div>
      </div>

      {/* Cells Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCells.map((cell) => (
          <Card key={cell.id} className="shadow-none border-slate-200 hover:shadow-sm transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {cell.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className={`w-2 h-2 rounded-full ${cell.status === 'online' ? 'bg-green-500' :
                    cell.status === 'offline' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}
                />
                <span className={`text-sm capitalize ${cell.status === 'online' ? 'text-green-600' :
                  cell.status === 'offline' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                  {cell.status}
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
