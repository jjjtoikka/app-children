# Children's Daily Schedule App - Specs for Google Stitch

## Overview

A web application for children that displays a visual daily schedule. The schedule is configurable by a parent/admin, who can set up activities for each day of the week or use pre-made templates. The app tracks the current time and visually indicates which activity is currently happening.

## Core Features

### 1. Daily Schedule View (Main Screen)
- **Primary user**: Child (viewer)
- **Purpose**: Show what happens today and what's coming up next
- **Key elements**:
  - **Current Time Display**: Large, friendly clock showing current time (digital, optionally analog)
  - **Current Activity Highlight**: The activity happening RIGHT NOW is visually prominent (bouncy animation, glow, larger size, pulsing border)
  - **Activity Timeline**: Vertical list of today's activities in chronological order
  - **Time Progress Bar**: Visual indicator showing how much time has passed in the current activity (e.g., "You are 15 minutes into breakfast - 15 more to go!")
  - **Completed Activities**: Past activities are dimmed/greyed out or have a checkmark
  - **Upcoming Activities**: Future activities shown in normal state
  - **Transition Indicators**: "Next up in 5 minutes..." countdown for upcoming transitions
  - **Weekday Display**: Show current day name ("Monday", "Tuesday", etc.)
  - **Date Display**: Show full date (e.g., "July 10, 2026")

### 2. Activity Definition (Admin Screen)
- **Primary user**: Parent/Admin
- **Purpose**: Create and manage what happens on each day
- **Key elements**:
  - **Day Selector**: Tabs or dropdown to pick which day to configure (Monday-Sunday)
  - **Activity List**: Drag-and-drop or ordered list of activities for the selected day
  - **Activity Editor Modal**:
    - **Activity Name**: Short, child-friendly label (e.g., "Breakfast", "Brush Teeth", "School", "Play Time")
    - **Start Time**: Time picker (hours + minutes)
    - **End Time**: Time picker (hours + minutes) OR Duration picker (e.g., "30 minutes")
    - **Color**: Pick a color for the activity card (from palette)
    - **Icon**: Emoji or Lucide icon picker
    - **Optional Description**: Longer text explaining what happens (for complex activities)
    - **Optional Sound**: Play a notification sound when this activity starts (checkbox)
    - **Optional Recurring**: "Repeat every [day checkbox]" (e.g., Mon-Wed-Fri)
  - **Add Activity Button**: Floating action button or top bar button to add new activity
  - **Delete Activity**: Swipe or button to remove an activity
  - **Reorder Activities**: Drag to reorder
  - **Copy to Other Days**: "Copy Monday's schedule to Tuesday" action

### 3. Templates (Admin Screen)
- **Primary user**: Parent/Admin
- **Purpose**: Quick setup using pre-defined schedules
- **Key elements**:
  - **Template Gallery**: Grid of template cards showing preview
    - "School Day" (wake up, breakfast, school, lunch, play, dinner, bed)
    - "Weekend" (wake up, breakfast, park/play, lunch, nap, play, dinner, bed)
    - "Holiday" (wake up, breakfast, trip/activity, lunch, play, dinner, movie, bed)
    - "Custom Template" (save current day's schedule as template)
  - **Template Preview**: Shows a mini timeline of the template
  - **Apply Template Button**: Assigns template to selected day(s)
  - **Edit Template**: Modify a template's activities
  - **Delete Template**: Remove custom templates
  - **Duplicate Template**: Clone and modify an existing template

### 4. Real-Time Tracking Logic
- **Current Activity Detection**: Compare current time against activity start/end times
- **Progress Calculation**: `(current_time - start_time) / (end_time - start_time)` shown as percentage or visual bar
- **Transition Warnings**: When approaching end of current activity (e.g., last 5 minutes), show gentle "wrapping up" indicator
- **Auto-Refresh**: Page updates every minute to reflect current time without full reload
- **No Activities State**: Show friendly message when no activities are configured for today (e.g., "No schedule for Saturday! Ask a grown-up to set one up.")

## Data Models

### Activity
```typescript
interface Activity {
  id: string;              // UUID
  name: string;            // "Breakfast", "School", "Play Time"
  startTime: string;       // "08:00" (24h format, HH:MM)
  endTime: string;         // "08:30" (24h format, HH:MM)
  color: string;           // Hex color, e.g., "#f97316"
  icon: string;            // Emoji or Lucide icon name, e.g., "🥞" or "sun"
  description?: string;    // Optional longer text
  playSound: boolean;      // Play notification on start
}
```

### DailySchedule
```typescript
interface DailySchedule {
  id: string;              // UUID
  dayOfWeek: number;       // 0-6 (Sunday=0, Monday=1, etc.)
  activities: Activity[];  // Ordered by startTime
  isTemplate: boolean;     // If true, this is a reusable template
  templateName?: string;   // Name like "School Day", "Weekend"
  updatedAt: Date;
}
```

### AppSettings
```typescript
interface AppSettings {
  currentView: "child" | "admin";  // Toggle between modes
  defaultTemplateId?: string;      // Default template for new days
  notificationSound: boolean;        // Global sound toggle
  timeFormat: "12h" | "24h";       // Clock display preference
  theme: "light" | "dark";         // For future dark mode support
}
```

## UI Screens Required

### Screen 1: Child View - Today's Schedule (Main Screen)
**Purpose**: The primary screen children see
**Layout**:
- **Top Bar**: Day name + date + current time (large, centered)
- **Main Area**: Scrollable vertical timeline of activities
- **Activity Card Component**:
  - Left side: Time range (start-end)
  - Center: Icon + Activity name + optional progress bar
  - Right side: Status indicator (past/completed, current/happening now, future/upcoming)
- **Current Activity**: Extra visual treatment (glow, pulsing, larger, animated emoji)
- **Completed**: Dimmed, greyed out, checkmark overlay
- **Upcoming**: Normal brightness, slightly smaller
- **No Activities**: Friendly illustration + message + button to go to admin

### Screen 2: Admin - Weekly Overview
**Purpose**: See all days at a glance
**Layout**:
- **Top Bar**: "Admin" label + "Back to Child View" button
- **Grid**: 7 day cards (Mon-Sun) showing:
  - Day name
  - Number of activities
  - Mini preview of first few activities
  - Indicator if template is applied
- **Actions**: "Apply Template to Week" button

### Screen 3: Admin - Day Editor
**Purpose**: Edit activities for a specific day
**Layout**:
- **Top Bar**: Day name + "Add Activity" button + "Copy to..." dropdown
- **Activity List**: Vertical list of activity cards, each showing:
  - Time range
  - Icon + Name
  - Color dot
  - Edit button (pencil)
  - Delete button (trash)
  - Drag handle for reordering
- **Empty State**: "No activities yet. Add one!" with big + button
- **Template Selector**: Dropdown to apply a template to this day

### Screen 4: Admin - Activity Form (Modal or Page)
**Purpose**: Create/edit a single activity
**Layout**:
- **Activity Name**: Text input
- **Time Range**: Two time pickers (start + end) OR start time + duration selector
- **Color**: Color palette grid (8-12 child-friendly colors)
- **Icon**: Emoji picker or icon grid
- **Description**: Optional textarea
- **Sound Toggle**: Checkbox "Play sound when activity starts"
- **Save Button**: Primary action
- **Cancel Button**: Secondary action

### Screen 5: Admin - Templates Gallery
**Purpose**: Browse and manage templates
**Layout**:
- **Top Bar**: "Templates" + "Create New Template" button
- **Template Cards Grid**: Each card shows:
  - Template name
  - Mini timeline preview (3-4 activities)
  - "Apply" button
  - "Edit" button (if custom)
  - "Delete" button (if custom)
- **Built-in vs Custom**: Section headers or tabs

## Design Requirements for Stitch

### Color Palette
- **Primary Orange**: `#f97316` - Current activity highlight, CTAs
- **Secondary Blue**: `#0ea5e9` - Upcoming activities, admin buttons
- **Success Green**: `#22c55e` - Completed activities
- **Neutral Gray**: `#6b7280` - Past/completed dimmed state
- **Background**: `#f9fafb` - Page background
- **Card Background**: `#ffffff` - Activity cards
- **Accent Colors for Activities**: Each activity can have its own color (configurable)

### Typography
- **Display Font**: Fredoka - Large headings, current time
- **Body Font**: Nunito - Activity names, descriptions
- **Clock Size**: 4xl-5xl (very large, readable from distance)
- **Activity Name**: xl (large for children to read)
- **Time Labels**: md (medium)

### Spacing & Touch Targets
- **Activity Card Height**: Min 64px (large touch targets for children if tapping)
- **Card Padding**: 16px-24px (generous)
- **Gap Between Cards**: 12px-16px
- **Border Radius**: xl (1.5rem) for cards, full (pill) for buttons

### Animations (Framer Motion)
- **Current Activity**: Subtle pulse/glow animation (scale 1.02 loop)
- **Progress Bar**: Smooth fill animation when activity starts
- **Scroll Into View**: Auto-scroll to current activity on load
- **Card Transitions**: Gentle fade-in when activities load
- **Completion Checkmark**: Scale + fade animation when activity completes

### Iconography
- Use **emoji** for activity icons (child-friendly, universal)
- Fallback to **Lucide icons** for UI elements (settings, edit, delete, drag)
- Current activity: Star/sparkle overlay on the icon

## State Management

### Client-Side State (React Context or Zustand)
- Current view mode (child/admin)
- Selected day for editing
- Currently editing activity
- Current time (updated every minute)

### Persistence
- **Option A**: LocalStorage (simple, no backend needed)
- **Option B**: JSON file on server (if you want sync across devices)
- **Recommended**: Start with LocalStorage for simplicity, migrate to backend later

### Time Update Logic
```typescript
// Update current time every minute
const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 60000); // Every 60 seconds
  return () => clearInterval(interval);
}, []);
```

### Current Activity Calculation
```typescript
function getCurrentActivity(activities: Activity[], now: Date): Activity | null {
  const currentTime = format(now, 'HH:mm');
  return activities.find(act => 
    act.startTime <= currentTime && act.endTime > currentTime
  ) || null;
}

function getActivityStatus(activity: Activity, now: Date): 'past' | 'current' | 'future' {
  const currentTime = format(now, 'HH:mm');
  if (activity.endTime <= currentTime) return 'past';
  if (activity.startTime <= currentTime && activity.endTime > currentTime) return 'current';
  return 'future';
}
```

## Accessibility Considerations
- **Large Text**: Activity names should be at least 18px
- **High Contrast**: Text on colored cards must meet WCAG AA
- **Animations**: Respect `prefers-reduced-motion` (disable pulse/glow for users who need it)
- **Screen Reader Support**: Semantic HTML with proper ARIA labels
- **Keyboard Navigation**: Admin views must be fully keyboard navigable

## Tech Stack Alignment
- **React Router**: Routes for `/` (child view), `/admin` (admin dashboard), `/admin/day/:day` (day editor), `/admin/templates` (templates)
- **Panda CSS**: Style the timeline, activity cards, progress bars, time pickers
- **Framer Motion**: Animate current activity, card transitions, progress bars
- **Lucide React**: Icons for UI controls (edit, delete, settings, clock)
- **date-fns**: Time formatting and calculations (optional, can use native Intl)

## Next Steps
1. **Generate UI designs in Stitch**: Use these specs as the prompt
2. **Export design tokens**: Update `panda.config.ts` with any new colors/tokens
3. **Build screens**: Start with Child View (most important), then Admin views
4. **Test with real schedules**: Create a sample "School Day" template and verify time tracking
5. **Add sound notifications**: Optional Web Audio API for activity start sounds
6. **Add persistence**: Save schedules to LocalStorage so they persist across reloads
