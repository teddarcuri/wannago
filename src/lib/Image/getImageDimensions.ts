export default async function (image) {
	return new Promise(resolve => {
		const fr = new FileReader();
		fr.onload = function () {
			const img = new Image();
			img.src = fr.result;
			img.onload = function () {
				const { width, height } = img;
				resolve({
					height,
					width,
				});
			};
		};
		fr.readAsDataURL(image);
	});
}
