import Checkbox from "@/src/components/form/Checkbox/Checkbox";
import FormCheckbox from "@/src/components/form/Checkbox/FormCheckbox";
import FormInput from "@/src/components/form/Input/FormInput";
import Input from "@/src/components/form/Input/Input";
import Label from "@/src/components/form/Label";
import SegmentedControl from "@/src/components/form/SegmentedControl/SegmentedControl";
import FormSelect from "@/src/components/form/Select/FormSelect";
import Select from "@/src/components/form/Select/Select";
import Screen from "@/src/components/layout/Screen/Screen";
import Button from "@/src/components/ui/Button";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { SegmentedControlOption, SelectOption } from "@/src/types/uiTypes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { Text } from "react-native";

const SELECT_OPTIONS: SelectOption[] = [
	{ value: "1", label: <ThemedText>Option 1</ThemedText> },
	{ value: "2", label: <ThemedText>Option 2</ThemedText> },
	{ value: "3", label: <ThemedText>Option 3</ThemedText> },
	{ value: "4", label: <ThemedText>Option 4</ThemedText> },
	{ value: "5", label: <ThemedText>Option 5</ThemedText> },
];

const SEGMENTED_CONTROL_OPTIONS: SegmentedControlOption[] = [
	{ value: "1", label: "Opt 1" },
	{ value: "2", label: "Opt 2" },
	{ value: "3", label: "Opt 3" },
];

const Home = () => {
	const [value, setValue] = useState("");
	const [selectValue, setSelectvalue] = useState(SELECT_OPTIONS[0]!.value);
	const [checked, setChecked] = useState(false);

	// #region Hooks
	const { admin, loading } = useAdminUser();
	//#endregion

	return (
		<Screen hasHeader={false}>
			<Screen.ScrollView>
				<Text>Home</Text>

				{loading && <ThemedText>Loading admin user...</ThemedText>}
				{!loading && <ThemedText>{JSON.stringify(admin, null, " ")}</ThemedText>}

				<ThemedView style={{ gap: 16 }}>
					<FormInput
						field="test"
						label="Test input"
						placeholder="Placeholder"
						value={value}
						onChangeText={(v) => setValue(v)}
					/>

					<Label>Test input</Label>
					<Input
						variant="neutral"
						placeholder="Placeholder"
						value={value}
						onChangeText={(v) => setValue(v)}
					/>
					<Input placeholder="Secure" secureTextEntry />

					<Select
						options={SELECT_OPTIONS}
						value={selectValue}
						onValueChange={(value) => setSelectvalue(value)}
					/>
					<FormSelect
						field="select"
						label="Select label"
						options={SELECT_OPTIONS}
						value={selectValue}
						onValueChange={(value) => setSelectvalue(value)}
					/>

					<Checkbox
						variant="neutral"
						value={checked}
						onValueChange={(checked) => setChecked(checked)}
					/>
					<FormCheckbox
						field="checkbox"
						label="Checkbox label Checkbox label Checkbox label Checkbox labelCheckbox labelCheckbox labelCheckbox label"
						value={checked}
						onValueChange={(checked) => setChecked(checked)}
					/>

					<SegmentedControl
						options={SEGMENTED_CONTROL_OPTIONS}
						value={selectValue}
						onValueChange={(value) => setSelectvalue(value)}
					/>

					<Button
						loading
						IconComponent={<AntDesign name="plus" size={14} color="white" />}
						title="Button"
					/>
					<Button
						variant="info"
						outlined
						// loading
						title="Button"
					/>
				</ThemedView>
			</Screen.ScrollView>
		</Screen>
	);
};

export default Home;
