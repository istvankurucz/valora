import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Feedback } from "../types/feedbackTypes";

// Context
type FeebackContextType = {
	feedback: Feedback | null;
	setFeedback: Dispatch<SetStateAction<Feedback | null>>;
	show: boolean;
	showFeedback: () => void;
	hideFeedback: () => void;
};
const FeebackContext = createContext<FeebackContextType>({
	feedback: null,
	setFeedback: () => {},
	show: false,
	showFeedback: () => {},
	hideFeedback: () => {},
});

// Provider
type Props = PropsWithChildren;

export const FeedbackProvider = ({ children }: Props) => {
	//#region States
	const [feedback, setFeedback] = useState<Feedback | null>(null);
	const [show, setShow] = useState(false);
	//#endregion

	// #region Refs
	const timeoutRef = useRef<number>(undefined);
	//#endregion

	// #region Functions
	const showFeedback = useCallback(() => {
		setShow(true);
	}, []);

	const hideFeedback = useCallback(() => {
		setShow(false);
		setFeedback(null);

		clearTimeout(timeoutRef.current);
	}, []);
	//#endregion

	// #region Hooks
	useEffect(() => {
		if (!feedback) return;

		// Remove active timeout
		clearTimeout(timeoutRef.current);

		// Show feedback
		showFeedback();

		// Hide feedback after timeout
		timeoutRef.current = setTimeout(hideFeedback, 10 * 1000);
	}, [feedback, showFeedback, hideFeedback]);
	//#endregion

	return (
		<FeebackContext.Provider value={{ feedback, setFeedback, show, showFeedback, hideFeedback }}>
			{children}
		</FeebackContext.Provider>
	);
};

// Hook
export const useFeedback = () => useContext(FeebackContext);
