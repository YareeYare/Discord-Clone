import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const Main = () => {
	return (
		<div>
			<UserButton afterSignOutUrl="/sign-in" />
			<ModeToggle />
		</div>
	);
}
 
export default Main;