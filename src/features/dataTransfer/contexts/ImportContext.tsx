import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useRef,
	useState,
} from "react";
import ImportConfirmModal from "../components/layout/ImportConfirmModal";
import { DataTransfer } from "../types/dataTransferTypes";

// Context
type ImportContextType = {
	importData: DataTransfer | null;
	setImportData: Dispatch<SetStateAction<DataTransfer | null>>;
	showModal: () => void;
	hideModal: () => void;
};
export const ImportContext = createContext<ImportContextType>({
	importData: null,
	setImportData: () => {},
	showModal: () => {},
	hideModal: () => {},
});

// Provider
type Props = PropsWithChildren;

export const ImportProvider = ({ children }: Props) => {
	//#region States
	const [importData, setImportData] = useState<DataTransfer | null>(null);
	//#endregion

	// #region Refs
	const modalRef = useRef<BottomSheetModal>(null);
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
		<ImportContext.Provider value={{ importData, setImportData, showModal, hideModal }}>
			{children}

			<ImportConfirmModal ref={modalRef} />
		</ImportContext.Provider>
	);
};

// Hook
export const useImport = () => useContext(ImportContext);
