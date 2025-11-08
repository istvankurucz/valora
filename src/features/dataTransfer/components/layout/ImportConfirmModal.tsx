import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTextContainer from "@/src/components/layout/BottomModal/BottomModalTextContainer";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { useImport } from "../../contexts/ImportContext";
import useDeleteCurrentData from "../../hooks/useDeleteCurrentData";
import useInsertImportedData from "../../hooks/useInsertImportedData";

type Props = BottomModalProps;

const ImportConfirmModal = forwardRef<BottomSheetModal, Props>(({ snapPoints, ...rest }, ref) => {
	// #region Hooks
	const { importData, setImportData, hideModal } = useImport();
	const { deleteCurrentData, loading: loadingDeleteCurrentData } = useDeleteCurrentData();
	const { insertImportedData, loading: loadingInsertImportedData } = useInsertImportedData();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	//#endregion

	// #region Constants
	const loading = loadingDeleteCurrentData || loadingInsertImportedData;
	//#endregion

	// #region Functions
	async function handleConfirmImportPress() {
		// Check import data
		if (!importData) return;

		try {
			// Delete current data
			await deleteCurrentData();

			// Insert imported data
			await insertImportedData(importData.data);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Data replaced successfully!",
			});

			// Reset import data
			setImportData(null);
			hideModal();
		} catch (err) {
			console.log("Error replacing data.", err);
			setError(err);
		}
	}

	return (
		<BottomModal snapPoints={[350]} {...rest} ref={ref}>
			<BottomModalTitle>Confirm import</BottomModalTitle>

			<BottomModalTextContainer>
				<ThemedText shade={600}>Are you sure you want to import this data?</ThemedText>
				<ThemedText shade={600}>
					All of your current data will be deleted and replaced with the imported data.
				</ThemedText>
			</BottomModalTextContainer>

			<Button title="Confirm import" loading={loading} onPress={handleConfirmImportPress} />
		</BottomModal>
	);
});

ImportConfirmModal.displayName = "ImportConfirmModal";

export default ImportConfirmModal;
