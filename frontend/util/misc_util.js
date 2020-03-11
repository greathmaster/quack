export function formatTimestamp(dateTimeString) {
	const d = new Date(dateTimeString);
	return d.toLocaleTimeString([], { timeStyle: "short" });
}
