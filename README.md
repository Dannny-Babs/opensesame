# Visual Macro Builder

A Voiceflow-like visual editor for building automation workflows with drag-and-drop functionality.

## 🚀 Features

- **Visual Flow Editor**: Drag and drop interface for building workflows
- **Custom Node Types**: Action nodes and Condition nodes with unique styling
- **Real-time Connections**: Connect nodes to create complex workflow logic
- **Animated UI**: Smooth transitions and hover effects using Framer Motion
- **State Management**: Efficient state handling with Zustand
- **Modern Design**: Beautiful UI built with Tailwind CSS
- **TypeScript Support**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React Flow (@xyflow/react)** - Visual node editor
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **TypeScript** - Type safety

## 📁 Project Structure

```
opensesame/
├── app/
│   ├── page.tsx              # Landing page
│   └── editor/
│       └── page.tsx          # Visual flow editor
├── components/
│   ├── FlowCanvas.tsx        # React Flow wrapper with drag/drop
│   ├── Sidebar.tsx           # Node library sidebar
│   ├── NodeTypes.tsx         # Node type configuration
│   └── nodes/
│       ├── ActionNode.tsx    # Custom action node component
│       └── ConditionNode.tsx # Custom condition node component
├── store/
│   └── useFlowStore.ts       # Zustand store for nodes/edges
└── data/
    └── initialFlow.ts        # Initial flow configuration
```

## 🎯 Getting Started

1. **Navigate to the homepage** at `http://localhost:3000`
2. **Click "Open Flow Editor"** to access the visual editor
3. **Drag nodes** from the sidebar onto the canvas
4. **Connect nodes** by dragging from connection points
5. **Move nodes** by clicking and dragging them
6. **Use controls** for zooming and panning

## 🎨 Node Types

### Action Nodes (Blue)
- Represent tasks or actions in your workflow
- Have input (left) and output (right) connection points
- Styled with blue gradient and lightning icon

### Condition Nodes (Orange/Yellow)
- Represent decision points in your workflow
- Diamond-shaped with rotation effect
- Multiple output points for Yes/No logic
- Additional top/bottom handles for branching

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌟 Key Features Implemented

### Drag and Drop
- Drag nodes from sidebar to canvas
- Visual feedback during drag operations
- Automatic node positioning

### Interactive Canvas
- Pan and zoom functionality
- Background grid for alignment
- Minimap for navigation
- Connection validation

### State Management
- Centralized state with Zustand
- Real-time updates for nodes and edges
- Proper TypeScript interfaces

### Visual Polish
- Smooth animations with Framer Motion
- Gradient backgrounds and shadows
- Hover effects and selection states
- Responsive design

## 🚀 Next Steps

Here are some suggested enhancements you could add:

1. **Node Configuration**: Add forms to configure node properties
2. **Export/Import**: Save flows as JSON and load them back
3. **Execution Engine**: Add logic to run the workflows
4. **More Node Types**: Timer, API call, database operations
5. **Validation**: Check for valid flow connections
6. **Templates**: Pre-built workflow templates
7. **Real-time Collaboration**: Multi-user editing
8. **API Integration**: Connect to external services

## 📝 Usage Examples

### Creating a Simple Workflow
1. Drag an "Action Node" to the canvas
2. Add a "Condition Node" 
3. Connect them by dragging from output to input
4. Add more nodes to build complex logic

### Connecting Nodes
- **Action to Action**: Linear workflow
- **Action to Condition**: Decision point
- **Condition to Multiple Actions**: Branching logic

## 🐛 Troubleshooting

If you encounter any issues:

1. **Clear browser cache** and refresh
2. **Check console** for error messages
3. **Restart development server**: `npm run dev`
4. **Update dependencies**: `npm install`

## 📄 License

This project is for educational and demonstration purposes.

---

**Happy Building!** 🎉

Your Visual Macro Builder is ready to create amazing automation workflows!
