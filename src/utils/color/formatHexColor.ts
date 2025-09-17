export default function formatHexColor(color: string): string {
	if (color.length === 9) return color;
	return `${color}ff`;
}
