import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import queryClient from "../config/queryClient";
import { ErrorProvider } from "../features/error/contexts/ErrorContext";
import RootNavigator from "../features/navigation/components/layout/RootNavigator";
import SplashScreenController from "../features/navigation/components/layout/SplashScreenController";
import { AdminUserProvider } from "../features/user/contexts/AdminUserContext";

// Prevent hiding splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView>
				<KeyboardProvider>
					<BottomSheetModalProvider>
						<ErrorProvider>
							<AdminUserProvider>
								<SafeAreaProvider>
									<SplashScreenController />

									<RootNavigator />

									<StatusBar style="auto" />
								</SafeAreaProvider>
							</AdminUserProvider>
						</ErrorProvider>
					</BottomSheetModalProvider>
				</KeyboardProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}
