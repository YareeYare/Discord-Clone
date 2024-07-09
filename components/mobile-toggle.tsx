import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar"
import { ServerSidebar } from "@/components/server/server-sidebar"

export const MobileToggle = ({ serverId }: { serverId: string }) => {
	return (
		<Sheet>
			<SheetTrigger>
				<div className="h-10 w-10 md:hidden hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
					<Menu />
				</div>
			</SheetTrigger>

			<SheetContent side="left" className="p-0 flex gap-0">
				<div className="w-[72px]">
					<NavigationSidebar />
				</div>
				<ServerSidebar serverId={serverId} />
			</SheetContent>
		</Sheet>
	)
}