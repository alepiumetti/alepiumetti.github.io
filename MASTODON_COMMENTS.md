# Mastodon Comments System

This blog now includes a Mastodon-based comments system that fetches and displays replies to Mastodon posts as comments on blog posts.

## How it works

1. When you publish a blog post, share it on Mastodon
2. Add the Mastodon post URL to your blog post's front matter
3. The system will automatically fetch and display replies as comments

## Usage

### For new posts:

1. Write your blog post normally
2. Publish the post to your blog
3. Share the blog post on Mastodon
4. Copy the Mastodon post URL
5. Add the `mastodon_url` field to your post's front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2025-01-01 12:00:00 +03
tags: [tag1, tag2]
mastodon_url: "https://rebel.ar/@piumaster/123456789"
---
```

### Features

- Automatically fetches replies from Mastodon
- Displays commenter avatars, names, and usernames
- Shows comment dates and links to original Mastodon posts
- Responsive design with dark mode support
- Graceful error handling if comments can't be loaded
- Call-to-action encouraging readers to join the conversation on Mastodon

### Files added/modified

- `assets/mastodon-comments.js` - JavaScript for fetching and displaying comments
- `assets/style.css` - Added CSS styles for comment display
- `_includes/mastodon-comments.html` - Include file for comments section
- `_layouts/post.html` - Updated to include comments functionality

### Technical details

The system uses the Mastodon API's `/api/v1/statuses/{id}/context` endpoint to fetch replies to a specific post. It only displays top-level replies (not replies to replies) to keep the comment thread simple and focused.

### Privacy and moderation

Comments are fetched directly from Mastodon, so moderation happens on the Mastodon platform. You can delete or hide inappropriate replies on Mastodon and they will no longer appear in the blog comments.