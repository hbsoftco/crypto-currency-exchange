const captchaRange = (progress: number, widthImageBg: number = 256): number => {
	const proportion = progress / 200;
	const newValue = Math.round(proportion * widthImageBg);

	return newValue;
};

export default captchaRange;
