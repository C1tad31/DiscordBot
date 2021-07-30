export function splitByWhitespace(content: string): string[] {
	return content.replace(/\s+/g, ' ').split(' ')
}