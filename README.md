# Kitchin - Household Meal Planning App

A React-based meal planning and shopping list application built with Zero, Clerk authentication, and Drizzle ORM.

## Features

- 🏠 **Household-based**: Each household has one meal plan and one shopping list
- 👥 **Multi-user**: Support for multiple users per household
- 🍽️ **Meal Planning**: Plan meals for each day of the week
- 🛒 **Shopping Lists**: Create and manage shopping lists with categories
- 🔐 **Authentication**: Secure user authentication with Clerk
- 📱 **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time Sync**: Zero (by Rocicorp)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 20.6+ (required for drizzle-zero)
- PostgreSQL database
- Clerk account

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# Zero Server
VITE_ZERO_SERVER=http://localhost:4848

# Zero Auth (for zero-cache server)
ZERO_AUTH_SECRET=your_jwt_secret_here
# OR use JWKS URL for Clerk
ZERO_AUTH_JWKS_URL=https://api.clerk.dev/v1/jwks
```

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your database and run migrations:

   ```bash
   npm run db:push
   ```

3. Start the development server:
   ```bash
   npm run dev:full
   ```

This will start both the Vite dev server and the Zero cache server.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── shopping-list/  # Shopping list components
│   └── meal-planner.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utilities and constants
└── db/                 # Database schema and migrations
```

## Authentication Flow

1. **User Signs Up/In**: Users authenticate through Clerk
2. **Household Creation**: First user creates a household
3. **User Assignment**: User is assigned to the household
4. **Data Isolation**: All data is filtered by household through Zero permissions

## Development Status

### Completed ✅

- [x] Basic CRUD operations for meals and shopping lists
- [x] UI components and styling
- [x] Clerk authentication integration
- [x] Database schema with households and users
- [x] Zero permissions setup

### In Progress 🔄

- [ ] Household creation flow
- [ ] User invitation system
- [ ] Proper JWT token handling

### Planned 📋

- [ ] Week navigation in meal planner
- [ ] Quick add items to shopping list
- [ ] Meal plan templates
- [ ] Shopping list sharing
- [ ] Recipe management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
