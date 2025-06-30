import { render, screen, fireEvent } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import { MacroCanvasDashboard } from '@/components/macro-canvas-dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock framer-motion to avoid test issues
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}))

// Mock React Flow to avoid canvas rendering issues in tests
jest.mock('@xyflow/react', () => ({
    ReactFlow: ({ children }: any) => <div data-testid="react-flow">{children}</div>,
    Background: () => <div data-testid="background" />,
    Controls: () => <div data-testid="controls" />,
    MiniMap: () => <div data-testid="minimap" />,
    ReactFlowProvider: ({ children }: any) => <div>{children}</div>,
    useNodesState: () => [[], jest.fn(), jest.fn()],
    useEdgesState: () => [[], jest.fn(), jest.fn()],
    addEdge: jest.fn(),
    ConnectionMode: { Loose: 'loose' },
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <ReactFlowProvider>
                {children}
            </ReactFlowProvider>
        </QueryClientProvider>
    )
}

describe('MacroCanvasDashboard', () => {
    it('renders the main components', () => {
        render(
            <TestWrapper>
                <MacroCanvasDashboard />
            </TestWrapper>
        )

        // Check for main sections
        expect(screen.getByText('Node Palette')).toBeInTheDocument()
        expect(screen.getByText('Agents')).toBeInTheDocument()
        expect(screen.getByText('Logic & Control')).toBeInTheDocument()
        expect(screen.getByText('Data & Knowledge')).toBeInTheDocument()
        expect(screen.getByTestId('react-flow')).toBeInTheDocument()
    })

    it('renders toolbar items', () => {
        render(
            <TestWrapper>
                <MacroCanvasDashboard />
            </TestWrapper>
        )

        expect(screen.getByText('Create New Macro')).toBeInTheDocument()
        expect(screen.getByText('Save Macro')).toBeInTheDocument()
        expect(screen.getByText('Publish Macro')).toBeInTheDocument()
        expect(screen.getByText('Run Macro')).toBeInTheDocument()
    })

    it('renders draggable node palette items', () => {
        render(
            <TestWrapper>
                <MacroCanvasDashboard />
            </TestWrapper>
        )

        expect(screen.getByText('API Agent')).toBeInTheDocument()
        expect(screen.getByText('LLM Agent')).toBeInTheDocument()
        expect(screen.getByText('Webhook Agent')).toBeInTheDocument()
        expect(screen.getByText('Decision')).toBeInTheDocument()
        expect(screen.getByText('Loop')).toBeInTheDocument()
    })

    it('renders bottom controls', () => {
        render(
            <TestWrapper>
                <MacroCanvasDashboard />
            </TestWrapper>
        )

        expect(screen.getByText('Note')).toBeInTheDocument()
        expect(screen.getByText('TODO')).toBeInTheDocument()
        expect(screen.getByText('Comment')).toBeInTheDocument()
        expect(screen.getByText('Zoom In')).toBeInTheDocument()
        expect(screen.getByText('Zoom Out')).toBeInTheDocument()
        expect(screen.getByText('Reset View')).toBeInTheDocument()
    })

    it('renders test agent button', () => {
        render(
            <TestWrapper>
                <MacroCanvasDashboard />
            </TestWrapper>
        )

        expect(screen.getByText('Test Agent')).toBeInTheDocument()
    })

    it('shows empty state when no nodes exist', () => {
        render(
            <TestWrapper>
                <MacroCanvasDashboard />
            </TestWrapper>
        )

        expect(screen.getByText('No macros created')).toBeInTheDocument()
        expect(screen.getByText('Start building your automation workflow')).toBeInTheDocument()
        expect(screen.getByText('Create Your First Macro')).toBeInTheDocument()
    })

    it('expands search input when clicked', () => {
        render(
            <TestWrapper>
                <MacroCanvasDashboard />
            </TestWrapper>
        )

        const searchButton = screen.getByText('Search')
        fireEvent.click(searchButton)

        expect(screen.getByPlaceholderText('Search nodes...')).toBeInTheDocument()
    })
}) 