declare module 'color-thief-ts' {
	class ColorThief {
		constructor();

		getColorAsync(
			imgUrl: string | HTMLImageElement
		): Promise<[number, number, number] | undefined>;

		getColor(
			imgUrl: string | HTMLImageElement
		): [number, number, number] | undefined;
	}
	export default ColorThief;
}
