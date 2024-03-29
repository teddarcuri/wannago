export default (label, color) => {
	if (typeof document === 'undefined') return;
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	var rectHeight = 44;
	var rectWidth = 30;
	var rectX = 0;
	var rectY = 0;

	// https://stackoverflow.com/a/7838871
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		this.beginPath();
		this.moveTo(x + r, y);
		this.arcTo(x + w, y, x + w, y + h, r);
		this.arcTo(x + w, y + h, x, y + h, r);
		this.arcTo(x, y + h, x, y, r);
		this.arcTo(x, y, x + w, y, r);
		this.closePath();
		return this;
	};

	canvas.width = rectWidth;
	canvas.height = rectHeight;

	var grd = context.createLinearGradient(0, 0, 0, 80);
	grd.addColorStop(0, `#${color}`);
	grd.addColorStop(1, 'black');

	context.fillStyle = grd;
	context.roundRect(rectX, rectY, rectWidth, rectHeight, 10).fill();
	context.font = '22px Proxima Nova';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillStyle = '#ffffff';

	context.fillText(label, rectX + rectWidth / 2, rectY + rectHeight / 2);

	return canvas;
};
