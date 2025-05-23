


# FocusMate: React Bottom Sheet Productivity Assistant

A sleek React app featuring a draggable bottom sheet with multiple snap points, combining a Chat Assistant and Task Scheduler to boost your productivity. Built with React hooks, smooth animations, and Tailwind CSS — no third-party animation libraries required.


**Deployment:** [Click here to view the app](https://focusmate-6y2s.onrender.com)


---

## Features

- **Draggable Bottom Sheet** with three snap points: collapsed, half-open, and fully open.
- **Spring-like smooth animations** on drag and snap transitions (custom implemented).
- **Chat Assistant** with auto-scrolling chat bubbles, persistent input, and canned AI responses.
- **Task Scheduler** to add, check off, and delete tasks with data saved in localStorage.
- Responsive and mobile-friendly design using Tailwind CSS.

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone or download the project files.
2. Navigate to the project directory in your terminal.
3. Install dependencies:

```bash
npm install
# or
yarn install
````

4. Start the development server:

```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Folder Structure

```
/src
  /components
    BottomSheet.jsx
    Tabs.jsx
    ChatAssistant.jsx
    ChatBubble.jsx
    TaskScheduler.jsx
    TaskItem.jsx
  /hooks
    useTasks.js
  App.jsx
  index.js
```

---

## Usage

* Drag the bottom sheet handle to switch between collapsed, half-open, and fully open views.
* Switch between “Chat” and “Tasks” tabs to interact with different features.
* In **Chat**, type messages to get automated assistant replies.
* In **Tasks**, add new tasks using the fixed input area at the top.
  The task list below scrolls independently and adapts to different screen sizes,
  ensuring a smooth and responsive experience.
* Mark tasks complete or delete them; your tasks persist on refresh.
---

## Technologies Used

* React with Hooks
* Tailwind CSS for styling
* LocalStorage API for task persistence
* Custom spring-motion animation logic (no external libs)

---


