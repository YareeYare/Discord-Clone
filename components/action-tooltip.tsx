"use client"

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface ActionTooltipProps {
	label: string;
	children: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end"
}

export const ActionTooltip = ({
	label,
	children,
	side,
	align
}: ActionTooltipProps) => {
	return(
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger asChild>
					{ children }
				</TooltipTrigger>
				<TooltipContent side={side} align={align} >
					<p className="font-semibold text-sm">
						{ label }
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}