import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

const SettingsInfo = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<View>
						<Section.Title>Creator</Section.Title>

						<Section style={styles.section}>
							<ThemedText>
								App was created by{" "}
								<ThemedText fontFamily="Poppins_600SemiBold">István Kurucz</ThemedText> in
								2025.
							</ThemedText>
						</Section>
					</View>

					<View>
						<Section.Title>Support</Section.Title>

						<Section style={styles.section}>
							<ThemedText style={styles.supportText}>
								If you have any questions, suggestions or found a bug, feel free to reach
								out to me via{" "}
								<Link
									href="mailto:kurucz.isti63@gmail.com?subject=Expense%20Tracker%20App%20Support"
									asChild
								>
									<Pressable>
										<ThemedText
											variant="info"
											shade={500}
											fontFamily="Poppins_500Medium_Italic"
											style={styles.link}
										>
											kurucz.isti63@gmail.com
										</ThemedText>
									</Pressable>
								</Link>
							</ThemedText>
						</Section>
					</View>
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	section: {
		gap: 8,
	},
	supportText: {
		lineHeight: 24,
	},
	link: {
		textDecorationLine: "underline",
	},
});

export default SettingsInfo;
