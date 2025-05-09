# 🎬 MovieBox

MovieBox is a modern movie discovery web application built with **SvelteKit**, integrating **Firebase** and **The Movie Database (TMDB)** API. It allows users to search for movies, view detailed information, and manage a personalized list of favourites.

---

## 📌 Purpose of the Project

The purpose of MovieBox is to provide a fast, responsive, and intuitive platform for movie enthusiasts to explore popular, trending, and searched films. The app offers:
- Full movie search functionality (with pagination)
- Live search for quick suggestions
- User authentication (email and password)
- Personalized favourites list synced to Firebase

---

## Implementation

MovieBox is built using **SvelteKit** for routing and reactivity, with the following integrations:
- **TMDB API**: Fetches movie data (search results, details, credits).
- **Firebase**: Handles authentication and stores user-specific favourite movies.
- **Tailwind CSS**: Provides a sleek and responsive UI design.

Each major feature—authentication, search, movie detail, favourites—is encapsulated in routes and components, using stores and reactive declarations for state management.

---

## Structure of the Codebase

```

src/
├── lib/
│   ├── api/                    # API clients (Firebase, TMDB, Favourites)
│   ├── components/             # UI components (MovieList, MediaDetails, Pagination)
│   ├── firebase/               # Firebase config and utilities
│   ├── stores/                 # Svelte stores (user)
│   └── types/                  # TypeScript types
│
├── routes/
|   ├── (pages)/
|   │   ├── about/              # About page
|   │   ├── auth/               # Login & Signup page
|   │   ├── contact/            # Placeholder contact page
|   │   ├── favourites/         # Protected favourites list
|   │   └── search/             # Search results and API calls
|   |
│   ├── movie/\[id]/            # Dynamic movie detail page
│   └── api/                    # Server endpoints (search, favourites)

````

---

## Description of APIs

### 🔍 `/api/search/full-search`
- **Method**: GET
- **Description**: Fetches paginated movie search results using the TMDB API.
- **Query Params**:
  - `query`: Movie search query (string)
  - `page`: Page number (optional)
- **Returns**: List of sorted results by popularity

### 🔎 `/api/search/live-search`
- **Method**: GET
- **Description**: Provides live-search results for quick lookups.
- **Returns**: Array of matching movies

### ❤️ `/api/favourites`
- **GET**: Retrieves the user's saved favourites from Firebase
- **POST**: Saves a new favourite movie
- **DELETE**: Removes a movie from the favourites list
- **Requires**: Authorization header with Firebase token

---

## Description of Stored Data

### Firebase Firestore structure
```
favourites/
  └── {userId}/
      └── items/
          └── {movieId}: {
                movieId,
                title,
                posterPath,
                createdAt
              }
```

### Firebase Auth

* Email and password sign-in
* User profile stores `displayName` and `email`

---

## Communication Between Components and Services

* **Svelte Stores**: Manage global state (`$user`, `$favStore`, `$authReady`)
* **APIs**: Server routes under `/api` act as backend handlers for data fetching and persistence.
* **Client-Side Navigation**: `goto()` is used for programmatic routing (e.g., redirecting after login).
* **Reactive Declarations**: `$:` is used extensively to reactively update UI based on state changes.

---

## Routes Overview

| Route             | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `/about`          | Describes the app and tech stack          |
| `/auth`           | User login and signup                     |
| `/favourites`     | Displays user's saved movies              |
| `/search`         | Paginated movie search results            |
| `/movie/[id]`     | Detailed view of selected movie           |
| `/contact`        | Placeholder for future content            |
| `/privacy-policy` | Placeholder for future content            |

---

## Tech Stack

* **SvelteKit** – Reactive front-end framework with SSR support
* **TypeScript** – Type safety across the app
* **Firebase** – Auth + Firestore for backend
* **TMDB API** – Movie data provider
* **Tailwind CSS** – Utility-first styling

---

## Author

This project was created with ❤️ by a developer passionate about clean code, smooth UX, and great movies.

> 💬 *Feel free to contribute or explore the source code*
