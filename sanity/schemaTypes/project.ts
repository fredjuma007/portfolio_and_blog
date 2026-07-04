import { defineField, defineType } from "sanity"

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description shown on the project card (max 300 chars)",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Project screenshot or cover image",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      description: "Technologies used (e.g. Next.js, TypeScript, Sanity)",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      description: "Link to the deployed project",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      description: "Link to the GitHub repo (only for open source projects)",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured projects appear first in the scroll rail",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (within the same featured/non-featured group)",
      initialValue: 0,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "In Progress", value: "in-progress" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "live",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      featured: "featured",
      media: "thumbnail",
    },
    prepare(selection) {
      const { title, status, featured, media } = selection
      return {
        title: `${featured ? "★ " : ""}${title}`,
        subtitle: status
          ? `${status.charAt(0).toUpperCase()}${status.slice(1).replace("-", " ")}`
          : "No status",
        media,
      }
    },
  },
  orderings: [
    {
      title: "Featured First, then by Order",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
})
