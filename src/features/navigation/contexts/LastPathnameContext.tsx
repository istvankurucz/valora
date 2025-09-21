import { usePathname } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";

// Context
type LastPathnameContextType = {
	pathname: string;
};
const LastPathnameContext = createContext<LastPathnameContextType>({
	pathname: "/",
});

// Provider
type Props = PropsWithChildren;

export const LastPathnameProvider = ({ children }: Props) => {
	// #region States
	const [lastPathname, setLastPathname] = useState("");
	//#endregion

	// #region Refs
	const lastPathnameRef = useRef("/");
	//#endregion

	// #region Hooks
	const pathname = usePathname();
	//#endregion

	useEffect(() => {
		if (lastPathnameRef.current !== pathname) {
			setLastPathname(lastPathnameRef.current);
			lastPathnameRef.current = pathname;
		}
	}, [lastPathname, lastPathnameRef, setLastPathname, pathname]);

	return (
		<LastPathnameContext.Provider value={{ pathname: lastPathname }}>
			{children}
		</LastPathnameContext.Provider>
	);
};

// Hook
export const useLastPathname = () => useContext(LastPathnameContext);
