import ThemedText, { ThemedTextProps } from "../ThemedText";

type Props = ThemedTextProps;

const ListItemInfo = ({ shade, children, ...rest }: Props) => {
	return (
		<ThemedText shade={shade ?? 500} {...rest}>
			{children}
		</ThemedText>
	);
};

export default ListItemInfo;
