export default function getBase64(image: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = reject;
	});
}
