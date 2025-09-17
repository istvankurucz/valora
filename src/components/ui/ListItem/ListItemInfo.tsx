import ThemedText, { ThemedTextProps } from "../ThemedText";

type Props = ThemedTextProps;

const ListItemInfo = ({ shade, children, ...rest }: Props) => {
	return (
		<ThemedText shade={shade ?? 600} {...rest}>
			{children}
		</ThemedText>
	);
};

export default ListItemInfo;
