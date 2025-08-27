# Aligna Frontend

A modern, responsive frontend for Aligna - the smart task scheduler built with React, Vite, TailwindCSS, and shadcn/ui components.

## Features

- **Landing Page**: Modern hero section with features showcase and call-to-action
- **Authentication**: Complete auth flow with login, signup, and password reset
- **Dashboard**: Interactive task management with sidebar navigation
- **Task Management**: Create, edit, and organize tasks with priorities and deadlines
- **Smart Recommendations**: AI-powered next task suggestions
- **Calendar View**: Weekly calendar with task scheduling and deadline tracking
- **Dependency Graph**: Visual representation of task dependencies
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Mock API**: Built-in fallback for offline development and demos

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS + shadcn/ui components
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **State Management**: React Context + useReducer

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK=true

# Optional: Spline 3D Scene URL
# VITE_SPLINE_SCENE_URL=https://prod.spline.design/your-scene-id/scene.splinecode
```

### Environment Variables Explained

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_USE_MOCK`: Set to `true` to use mock data, `false` to connect to real backend
- `VITE_SPLINE_SCENE_URL`: Optional URL for 3D Spline scene in hero section

## Demo Credentials

For testing the authentication flow with mock data:

- **Email**: `user@example.com`
- **Password**: `password`

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── api/               # API layer with mock fallback
│   │   └── api.js
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui base components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── TaskForm.jsx
│   │   ├── NextTaskCard.jsx
│   │   ├── Graph.jsx
│   │   └── SplineHero.jsx
│   ├── context/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useAuth.js
│   ├── lib/              # Utility functions
│   │   └── utils.js
│   ├── pages/            # Page components
│   │   ├── Landing/
│   │   │   └── Landing.jsx
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword.jsx
│   │   └── Dashboard/
│   │       ├── Dashboard.jsx
│   │       └── CalendarView.jsx
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features

### Authentication
- JWT-based authentication with localStorage persistence
- Protected routes with automatic redirects
- Password reset functionality
- Form validation and error handling

### Task Management
- Create tasks with title, description, priority, deadline, and duration
- Visual priority indicators (red for high, amber for medium, gray for low)
- Task status tracking (pending, in-progress, completed)
- Dependency management

### Dashboard
- Left sidebar navigation with user profile
- Main task list with filtering and sorting
- Right panel with next task recommendations and quick stats
- Responsive layout for mobile and desktop

### Calendar View
- Weekly calendar grid with task scheduling
- Deadline visualization
- Task details on date selection
- Navigation between weeks

### Dependency Graph
- Interactive SVG-based task dependency visualization
- Node selection for task details
- Zoom and pan controls
- Status-based color coding

## API Integration

The app includes a comprehensive API layer (`src/api/api.js`) with:

- **Mock Data**: Built-in fallback for development and demos
- **Real API Support**: Ready to connect to backend endpoints
- **Error Handling**: Graceful fallback to mock data on API failures
- **Loading States**: Proper loading indicators throughout the app

### API Endpoints

- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/signup` - User registration  
- `POST /api/v1/auth/forgot-password` - Password reset
- `GET /api/v1/tasks` - Fetch user tasks
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/schedule` - Get task schedule
- `GET /api/v1/schedule/next` - Get next recommended task

## Customization

### Adding New Components
1. Create component in appropriate directory under `src/components/`
2. Export from component file
3. Import and use in pages or other components

### Styling
- Use TailwindCSS utility classes for styling
- Extend theme in `tailwind.config.js` for custom colors/spacing
- shadcn/ui components are in `src/components/ui/`

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation if needed

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in deployment settings

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
