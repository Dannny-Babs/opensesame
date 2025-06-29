
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

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
      <div className="flex-1 flex flex-col gap-4 p-6 pt-0 font-sans">
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Overview</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
      </div>
    </div>
  );
}
