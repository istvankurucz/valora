import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { useFeedback } from "../../feedback/contexts/FeedbackContext";
import AppError from "../classes/AppError";

// Context
type ErrorContextType = {
	error: unknown;
	setError: Dispatch<SetStateAction<unknown>>;
};
const ErrorContext = createContext<ErrorContextType>({
	error: null,
	setError: () => {},
});

// Provider
type Props = PropsWithChildren;
export const ErrorProvider = ({ children }: Props) => {
	// #region States
	const [error, setError] = useState<unknown>(null);
	//#endregion

	// #region Hooks
	const { setFeedback } = useFeedback();

	useEffect(() => {
		// No error
		if (!error) return;

		// Log error
		console.log(error);

		// App error
		if (error instanceof AppError) {
			setFeedback({
				type: "error",
				message: error.message,
				details: error.details,
			});
		}
	}, [error, setFeedback]);
	//#endregion

	return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
};

// Hook
export const useError = () => useContext(ErrorContext);
