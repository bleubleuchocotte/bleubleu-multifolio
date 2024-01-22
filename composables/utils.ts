export function useUID() {
	const timestamp = new Date().getTime();
	const randomPart = Math.random().toString(36).substring(2, 8); // 6 random characters
	return `${timestamp}-${randomPart}`;
}
