import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, PropsWithChildren, RefObject, useContext, useRef } from "react";

// Context
type ChartModalContextType = {
	modalRef: RefObject<BottomSheetModal | null>;
	showModal: () => void;
	hideModal: () => void;
};
const ChartModalContext = createContext<ChartModalContextType>({
	modalRef: { current: null },
	showModal: () => {},
	hideModal: () => {},
});

// Provider
type Props = PropsWithChildren;

export const ChartModalProvider = ({ children }: Props) => {
	// #region Refs
	const modalRef = useRef<BottomSheetModal | null>(null);
	//#endregion

	// #region Functions
	function showModal() {
		modalRef.current?.present();
	}
	function hideModal() {
		modalRef.current?.close();
	}
	//#endregion

	return (
		<ChartModalContext.Provider
			value={{
				modalRef,
				showModal,
				hideModal,
			}}
		>
			{children}
		</ChartModalContext.Provider>
	);
};

// Hook
export const useChartModal = () => useContext(ChartModalContext);
