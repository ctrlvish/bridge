# Bridge

**where songs become stories**

Product Requirements Document, Version 1.0, MVP Scope  
Author: Vishnu

---

## 1. What is Bridge

Bridge is a mobile-first platform where people write about music that matters to them. Each post pairs a song, album, or artist pulled from Spotify with the personal writing it inspired. Bridge sits closer to Substack or Medium than to Musicboard or RateYourMusic, with the emphasis on voice, not catalogue.

**Tagline:** where songs become stories

### Inspiration

- Medium: clean reading experience, writing as the product
- Substack: individual voice as the draw, the writer is the product
- Musicboard and RateYourMusic: music as subject matter, but Bridge is more intimate and less catalogue-driven

## 2. Where Music Meets Personal Writing

Everyone connects to music differently, and has something worth saying about it. Bridge is a place to express that. Music is the prompt, writing is the product.

## 3. Who Is Bridge For

Anyone that enjoys discussing music.

## 4. User Stories

### Creating and Posting

- As a logged-in user, I can attach a track, album, or artist to my post so that my readers can reference what I talk about.
- As a logged-in user, I can write a plain text title and body so that I can express what I want about the song.
- As a logged-in user, I can publish my post and get a shareable link so that I can send it to someone.
- As a logged-in user, I can delete or private my posts so that I stay in control of what I have shared.
- As a logged-in user, I can like, comment, and share posts on my feed so that I can socialise.

### Reading and Discovery

- As a logged-in user, I can see posts from people I follow at the top of my feed, then public posts below so that my feed feels personal.
- As a visitor, I can open a shared post link without an account so that the writing reaches whoever it was meant for.
- As a visitor, I can browse the public feed without logging in so that I can discover Bridge before signing up.
- As a visitor, I can visit a user profile and read all their posts so that I can follow someone's voice over time.

### Social and Following

- As a logged-in user, I can follow and unfollow other users so that my feed reflects the voices I want to read.
- As a logged-in user, I can like and comment on posts so that I can respond to writing that moves me.
- As a logged-in user, I can delete my own comments so that I stay in control of my presence on others' posts.

### Profile and Account

- As a logged-in user, I can edit my display name, bio, and profile photo so that my profile reflects who I am.
- As a logged-in user, I can sign up, log in, and log out reliably so that my account and posts are always secure and accessible.

### Visitor Experience

- As a visitor, I can read any public post in full so that I get the full experience before deciding to join.
- As a visitor, I can be prompted to sign up when I try to post, follow, or like so that the path to joining feels natural.

## 5. Feature Scope

### MVP

- Auth: sign up, log in, log out, persistent session
- Create and delete posts with plain text body and title
- Paste song, album, or artist URL and embed via Spotify API
- Feed page with public shareable URL to post
- Functioning likes and UI for comments and bookmarks
- User profiles with avatar upload
- Follow and unfollow users
- Mobile-first responsive design
- Deployed and live on Vercel

## 6. Data Model

Hosted on Supabase PostgreSQL. All tables include `created_at` timestamps. Row Level Security enforces auth-gated writes.

> Subject to change since this is still being brainstormed.

### `users`

- `id`: uuid primary key
- `email`: text unique
- `display_name`: text
- `bio`: text nullable
- `avatar_url`: text nullable, Supabase Storage

### `posts`

- `id`: uuid primary key
- `user_id`: foreign key to users
- `title`: text
- `body`: text
- `spotify_url`: text nullable

### `follows`

- `follower_id`: foreign key to users
- `following_id`: foreign key to users
- Unique constraint on `follower_id` and `following_id`

### `likes`

- `user_id`: foreign key to users
- `post_id`: foreign key to posts
- Unique constraint on `user_id` and `post_id`

### `comments`

- `id`: uuid primary key
- `user_id`: foreign key to users
- `post_id`: foreign key to posts
- `body`: text

## 7. Tech Stack

| Layer        | Choice           | Why                                                              |
| ------------ | ---------------- | ---------------------------------------------------------------- |
| Frontend     | Next.js 16.2.3   | App Router, server components, good for SEO on public post pages |
| Styling      | Tailwind CSS     | Mobile-first utility classes, fast to iterate                    |
| Auth         | Supabase Auth    | Email and password, sessions, integrates with the database       |
| Database     | Supabase         | PostgreSQL with Row Level Security                               |
| Storage      | Supabase Storage | Profile avatar uploads                                           |
| External API | Spotify Web API  | Search songs, albums, artists, fetch artwork and metadata        |
| Deployment   | Vercel           | Deploy from GitHub, free tier, preview URLs per branch           |

## 8. Pages and Routes

### `/`

Redirects to feed or login.

### `/feed`

Feed. Public.

Logged-in users see followed posts first, then public posts. Logged-out visitors see all public posts. A "what's on your mind" prompt at the top opens a sheet modal for creating posts when authenticated.

### `/post/[id]`

Single post. Public and shareable.

Full post view with album art, music metadata, writing, likes, and comments.

### `/profile/[username]`

User profile. Public.

Display name, bio, avatar, follower and following counts, all posts by that user.

### `/settings`

Account settings. Authenticated.

Edit display name, bio, and avatar.

### `/login` and `/signup`

Simple forms. Redirect to feed on success.

## 9. Out of Scope for MVP

- Comments and bookmarks are UI buttons only for now
- Only supports embeds from Spotify
- YouTube support for post embeds in v2
- No genre or artist tag following, users follow people rather than topics
- No artist or song aggregation pages, posts live on profiles
- No post editing, publish is final in v1
- No search, discovery is through feed and profiles
- No notifications

## 10. Design Direction

Design direction is not fully decided.

Bridge should feel editorial and intimate. Typography carries the weight of the experience because the writing is the product.

Mobile-first. Most shared links will be opened on a phone. Post reading on mobile must be excellent before anything else.

### Ideas

1. 
2. 

---

Bridge, PRD v1.0, MVP
