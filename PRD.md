# Product Requirements Document (PRD) - DinnerSwipe

## 1. Project Overview
**DinnerSwipe** is a web application designed to help a single user select a perfect 3-course menu (Voorgerecht, Hoofdgerecht, Nagerecht) through an engaging swiping and tournament-style interface. The application consists of two main parts: a **Guest Swipe Experience** for the user and an **Admin Dashboard** for managing the database of dishes.

The UI is initially built with clean, minimalist placeholder styling using TailwindCSS, ready to be replaced by a premium Figma design later.

## 2. Technical Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS (clean utility structure)
- **State Management:** React Server Components + `useState` for local interaction
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Admin only: Magic link or Password)
- **Storage:** Supabase Storage ("dish-images" bucket)
- **Layout:** Fully responsive mobile-first layout

## 3. Database Models (Supabase)

### Table: `dishes`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary Key |
| `category` | text | 'voor', 'hoofd', 'na' |
| `name` | text | Name of the dish |
| `subtitle` | text | Short description |
| `ingredients` | text | List of ingredients |
| `preparation` | text | Preparation instructions |
| `image_url` | text | URL to Supabase Storage |
| `created_at` | timestamp | Creation timestamp |

*Note: No group or user voting tables are required as this is a single-user experience.*

## 4. Functional Requirements

### 4.1 Admin Dashboard
**Routes:**
- `/admin/login`
- `/admin` (Dashboard)
- `/admin/dishes` (List)
- `/admin/dishes/new` (Create)
- `/admin/dishes/[id]` (Edit)

**Features:**
1.  **Login Screen:** Secure access using Supabase Auth.
2.  **Dish Management (CRUD):**
    -   **List:** View dishes with photo thumbnail, name, and category.
    -   **Create:** Upload image to Supabase, enter details (name, category, ingredients, preparation), live preview of the generated Card.
    -   **Edit:** Modify existing dish details and image.
    -   **Delete:** Remove dishes with a confirmation modal.

### 4.2 Guest Swipe Experience
**Routes:**
- `/` (Home)
- `/intro/[category]`
- `/swipe/[category]`
- `/duel/[category]`
- `/top3/[category]`
- `/final`

**Flow:**
1.  **Start Screen:** Romantic premium feel placeholder.
2.  **Category Intro:** Explains the rules for the current category (Voorgerecht, Hoofdgerecht, or Nagerecht).
3.  **Swipe Screen:**
    -   Loads 10 dishes per category from Supabase.
    -   **Interactions:**
        -   Swipe Right = Like (Score 1)
        -   Swipe Up = Favorite (Score 2)
        -   Swipe Left = Dislike (Score 0)
    -   Scores are stored in local state/storage temporarily.
4.  **Duel Screen:**
    -   Triggered after swiping is complete.
    -   Filters dishes with Score >= 1.
    -   **Logic:**
        -   If 1 dish remains → Auto winner.
        -   If 2 dishes remain → Single duel.
        -   If >2 dishes remain → Tournament bracket to determine ranking.
5.  **Top 3 Screen:**
    -   Displays the ranked top 3 dishes.
    -   User manually selects the final winner for the category.
6.  **Repeat:** The flow repeats for the next categories (Hoofdgerecht, Nagerecht).
7.  **Final Screen:**
    -   Displays the complete selected menu (Voor + Hoofd + Na).
    -   Premium layout presentation.
    -   "Restart" button to clear session and start over.

## 5. Component Architecture

### Core Components (`/components`)
-   **Header:** Placeholder version (Figma style added later).
-   **DishCardLarge:** Main card for the swipe interface (Image, Name, Category).
-   **DishCardSmall:** Compact card for Top 3 ranking and lists.
-   **DuelCard:** Layout for comparing two dishes side-by-side.
-   **ProgressDots:** Visual indicator for swipe progress.
-   **PrimaryButton:** Main call-to-action button.
-   **SecondaryButton:** Alternative action button.

### Utilities (`/utils` or `/lib`)
-   **tournament.ts:** Contains the logic for ranking and bracket generation.
-   **supabaseClient.ts:** Configuration for Supabase connection.

## 6. Styling Guidelines
-   **Approach:** Mobile-first, clean utility structure.
-   **Theme:** Minimalistic, neutral colors (placeholders).
-   **Customization:** A `theme.ts` file is exposed to allow easy overriding of colors, spacing, and shadows when the final Figma design is ready.
-   **Animations:** Mock animations using Tailwind classes for transitions.

## 7. Environment Variables
The application requires the following environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE=your-service-role-key