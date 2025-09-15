import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import useInitDB from "@/src/hooks/useInitDB";
import useLoadFonts from "@/src/hooks/useLoadFonts";
import { SplashScreen } from "expo-router";

const SplashScreenController = () => {
	// #region Hooks
	const { loading: loadingMigrations } = useInitDB();
	const { loading: loadingFonts } = useLoadFonts();
	const { loading: loadingAdmin } = useAdminUser();
	//#endregion

	// #region Constants
	const loading = loadingMigrations || loadingFonts || loadingAdmin;
	//#endregion

	// Hide splash screen
	if (!loading) SplashScreen.hideAsync();

	return null;
};

export default SplashScreenController;
