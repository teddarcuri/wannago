export default function (lat, lng) {
	if (!lat || !lng) return '';
	const latFormatted = `${Math.abs(lat.toFixed(3))}° ${lat > 0 ? 'N' : 'S'}`;
	const lngFormatted = `${Math.abs(lng.toFixed(3))}° ${lng > 0 ? 'E' : 'W'}`;
	return `${latFormatted}, ${lngFormatted}`;
}
