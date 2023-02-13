import { z } from 'zod';

export default z.object({
	name: z
		.string()
		.min(1, 'Name cannot be empty')
		.max(255, 'Name cannot be longer than 255 characters')
		.regex(/^[^<>&;?]+$/, 'Name cannot contain <, >, &,; , or ?'),
});
