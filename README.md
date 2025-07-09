# Kitchin - Local-First Meal Planning App

A **Zero-powered** React application demonstrating local-first architecture for meal planning and shopping lists. Built to showcase [Zero by Rocicorp](https://zero.rocicorp.dev/) - a revolutionary sync engine that provides instant (zero milliseconds) response time and real-time collaboration.

## 🚀 Zero: The Star Technology

**Zero** is a local-first sync engine that fundamentally changes how web applications handle data:

- **⚡ Instant Response**: Zero milliseconds response time for all user interactions
- **🔄 Real-time Sync**: Live updates across all devices, tabs, and users
- **📱 Offline Support**: Works seamlessly offline with client-side persistence
- **🎯 Strategic Preloading**: Data available on next frame navigation
- **🔗 Partial Sync**: Only syncs data you need, scales to millions of rows
- **🛡️ Optimistic Updates**: UI updates instantly while syncing in background

## ✨ Current Features

- **🍽️ Meal Planning**: Plan meals for each day of the week with instant updates
- **🛒 Smart Shopping Lists**: Categorized shopping lists with completion tracking
- **⚡ Instant Navigation**: Next-frame data loading with TanStack Router
- **🔄 Real-time Collaboration**: Changes sync instantly across all users
- **📱 Responsive Design**: Works beautifully on desktop and mobile
- **🎨 Modern UI**: Clean interface built with Tailwind CSS and Radix UI

## 🏗️ Architecture

This app demonstrates a **clean, scalable architecture** powered by Zero:

```
src/
├── providers/           # Zero provider and app initialization
├── lib/                 # Utilities, constants, and preloading logic
├── routes/              # TanStack Router routes with strategic preloading
├── hooks/               # Custom React hooks for Zero queries
├── components/          # UI components
│   ├── ui/             # Reusable UI components
│   ├── shopping-list/  # Shopping list feature components
│   └── meal-planner.tsx
└── db/                  # Database schema and migrations
```

## 🛠️ Tech Stack

- **Local-First Engine**: [Zero by Rocicorp](https://zero.rocicorp.dev/)
- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: TanStack Router with strategic preloading
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI

## 🚀 Getting Started

### Prerequisites

- Node.js 20.6+ (required for drizzle-zero)
- PostgreSQL database

### Environment Setup

Create a `.env` file in the root directory:

```env
# Zero Server
VITE_ZERO_SERVER=http://localhost:4848

# Zero Auth (for zero-cache server)
ZERO_AUTH_SECRET=your_jwt_secret_here
```

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up your database:**

   ```bash
   npm run db:push
   ```

3. **Start the development server:**
   ```bash
   npm run dev:full
   ```

This starts both the Vite dev server and the Zero cache server.

## 🎯 Zero Integration Highlights

### Strategic Preloading

```typescript
// Routes preload data for instant navigation
export const Route = createFileRoute('/meals')({
  loader: async ({ context }) => {
    const { zero } = context;
    // Preload meal data for instant UI updates
    zero.query.mealPlans.preload({ ttl: '1m' });
    zero.query.meals.preload({ ttl: '1m' });
    return Promise.resolve();
  },
  component: () => <MealPlanner />,
});
```

### Real-time Queries

```typescript
// Instant queries with live updates
function MealPlanner() {
  const { meals, mealPlan } = useMeals();

  // Data is always fresh, updates happen instantly
  return (
    <div>
      {meals.map(meal => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}
```

### Optimistic Updates

```typescript
// Mutations update UI instantly
const { updateMeal } = useMutations();

const handleMealChange = (id: string, notes: string) => {
  // UI updates immediately, sync happens in background
  updateMeal(id, notes);
};
```

## 📊 Development Status

### ✅ Completed

- **Zero Integration**: Full Zero sync engine implementation
- **Strategic Preloading**: Next-frame data loading with TanStack Router
- **Meal Planning**: Weekly meal planning with real-time updates
- **Shopping Lists**: Categorized shopping lists with completion tracking
- **Real-time Sync**: Live updates across all devices and users
- **Clean Architecture**: Organized codebase with providers and hooks
- **Responsive UI**: Mobile-first design with Tailwind CSS

### 🔄 Future Enhancements

- **🔐 Authentication**: User authentication with Clerk
- **👥 Multi-user Households**: Support for multiple users per household
- **📅 Calendar Integration**: Week navigation and meal scheduling
- **🔄 Data Export/Import**: Meal plan templates and sharing
- **🧠 Smart Suggestions**: AI-powered meal recommendations
- **📱 Mobile App**: React Native version with Zero sync
- **🛒 Grocery Integration**: Connect with grocery store APIs
- **📊 Analytics**: Meal planning insights and nutrition tracking

## 🌟 Why Zero?

This project showcases Zero's game-changing approach to web development:

1. **No Loading Spinners**: Data is always available instantly
2. **No Complex State Management**: Zero handles all synchronization
3. **No Backend APIs**: Direct database queries with full type safety
4. **No Realtime Complexity**: Live updates work out of the box
5. **No Offline Concerns**: Works seamlessly online and offline

## 📚 Learn More

- [Zero Documentation](https://zero.rocicorp.dev/)
- [Zero GitHub](https://github.com/rocicorp/zero)
- [TanStack Router](https://tanstack.com/router)
- [Local-First Software](https://www.inkandswitch.com/local-first/)

## 📄 License

MIT License - Feel free to use this as a reference for your own Zero applications!

---

_Built with ❤️ to showcase the power of local-first architecture with Zero._
