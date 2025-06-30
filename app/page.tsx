"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  CheckCircle,
  Activity,
  Zap,
  TrendingUp,
  ArrowUpDown,
  Plus
} from "lucide-react"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserGroup02Icon } from "@hugeicons/core-free-icons"

// Mock data - replace with real API calls
const metricCards = [
  {
    title: "Cells",
    value: "3",
    subtitle: "Cells Online",
    icon: Zap,
    color: "text-blue-600"
  },
  {
    title: "Macros",
    value: "12",
    subtitle: "Macros Active",
    icon: Activity,
    color: "text-green-600"
  },
  {
    title: "Usage",
    value: "89",
    subtitle: "Runs (95% OK)",
    icon: TrendingUp,
    color: "text-purple-600"
  }
]

const recentActivity = [
  {
    type: "error",
    message: "API Cell 'Orders-DB' failed to connect",
    time: "2 min ago"
  },
  {
    type: "warning",
    message: "Macro 'Customer-Support' has 3 pending approvals",
    time: "15 min ago"
  },
  {
    type: "info",
    message: "New macro 'Invoice-Lookup' deployed successfully",
    time: "1 hour ago"
  }
]

const unmappedIntents = [
  {
    id: 1,
    prompt: "cancel order",
    frequency: 37,
    lastTried: "Jun 29, 2025",
    selected: false
  },
  {
    id: 2,
    prompt: "where is invoice",
    frequency: 22,
    lastTried: "Jun 29, 2025",
    selected: false
  },
  {
    id: 3,
    prompt: "escalate ticket",
    frequency: 15,
    lastTried: "Jun 28, 2025",
    selected: false
  },
  {
    id: 4,
    prompt: "refund request status",
    frequency: 12,
    lastTried: "Jun 28, 2025",
    selected: false
  },
  {
    id: 5,
    prompt: "update shipping address",
    frequency: 8,
    lastTried: "Jun 27, 2025",
    selected: false
  }
]

function MetricCard({ title, value, subtitle, icon: Icon, color }: typeof metricCards[0]) {
  return (
    <Card className="shadow-none border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  )
}

function ActivityAlert({ type, message, time }: typeof recentActivity[0]) {
  const getIcon = () => {
    switch (type) {
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "info": return <CheckCircle className="h-4 w-4 text-blue-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getBadgeColor = () => {
    switch (type) {
      case "error": return "bg-red-100 text-red-800 border-red-200 shadow-none"
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200 shadow-none"
      case "info": return "bg-blue-100 text-blue-800 border-blue-200 shadow-none"
      default: return "bg-gray-100 text-gray-800 border-gray-200 shadow-none"
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-white">
      {getIcon()}
      <div className="flex-1">
        <p className="text-sm text-gray-900">{message}</p>
      </div>
      <Badge className={`text-xs shadow-none ${getBadgeColor()}`}>
        {time}
      </Badge>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex-1 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                Overview
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-1 flex flex-col gap-6 p-6 pt-0 font-sans">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Main Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, John Doe</p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metricCards.map((card, index) => (
            <MetricCard key={index} {...card} />
          ))}
        </div>

        {/* Recent Activity / Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <ActivityAlert key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Unmapped Intents Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Unmapped Intents</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Bulk Actions</Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Macro
              </Button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-8 px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      aria-label="Select all intents"
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Prompt Text
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Tried By
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Last Tried
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {unmappedIntents.map((intent) => (
                  <tr key={intent.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        aria-label={`Select intent: ${intent.prompt}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900 font-medium">
                        {intent.prompt.length > 30
                          ? `${intent.prompt.substring(0, 30)}...`
                          : intent.prompt
                        }
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={UserGroup02Icon} strokeWidth={1.5} className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{intent.frequency} users</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{intent.lastTried}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Create Macro
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                          Ignore
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing 5 of 23 unmapped intents</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
