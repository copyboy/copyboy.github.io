import { defineCollection, z } from 'astro:content';

const hideElements = z.enum([
	'title',
	'date',
	'lastmod',
	'tags',
	'readingTime',
	'toc',
	'comments',
]);
export type PostHideElements = z.infer<typeof hideElements>;

// 定义文章分类枚举
const categoryEnum = z.enum(['学习', '工作', '生活', '絮叨']);
export type PostCategory = z.infer<typeof categoryEnum>;

const posts = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			image: image().optional(),
			date: z.date().optional(),
			lastmod: z.date().optional(),
			hidden: z.boolean().optional(),
			category: categoryEnum.optional(),
			tags: z.array(z.string()).optional(),
			readingTime: z
				.object({
					text: z.string(),
					time: z.number(),
					words: z.number(),
					minutes: z.number(),
				})
				.optional(),
			hide: z.array(hideElements).optional(),
		}),
});

export const collections = {
	posts,
};
