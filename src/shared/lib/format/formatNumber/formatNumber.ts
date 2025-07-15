export const formatNumber = (number: number) => {
	const formattedNumber = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
		useGrouping: false,
	}).format(number);

	return formattedNumber;
};
