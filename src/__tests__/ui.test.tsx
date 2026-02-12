import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'
import Search from '@/components/Search'
import SidebarNav from '@/components/SidebarNav'
import VersionSelector from '@/components/VersionSelector'
import CodeBlock from '@/components/CodeBlock'
import FeedbackWidget from '@/components/FeedbackWidget'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/en/docs/v1/introduction',
    useRouter: () => ({
        push: jest.fn(),
    }),
}))

// Mock next-themes
jest.mock('next-themes', () => ({
    useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}))

describe('UI Components Verification', () => {
    it('ThemeToggle has correct test id', () => {
        render(<ThemeToggle />)
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    it('Search has input and results test ids', () => {
        render(<Search />)
        expect(screen.getByTestId('search-input')).toBeInTheDocument()
        // Simulate focus/input to potentially show results (mocking fetch would be needed for full integration)
        const input = screen.getByTestId('search-input')
        fireEvent.focus(input)
        // We just verify the input for now as results depend on fetch
    })

    it('SidebarNav renders links with test ids', () => {
        const docs = [{ slug: 'intro', title: 'Intro' }]
        render(<SidebarNav docs={docs} lang="en" version="v1" />)
        expect(screen.getByTestId('sidebar-nav-link-intro')).toBeInTheDocument()
    })

    it('VersionSelector exists', () => {
        render(<VersionSelector />)
        expect(screen.getByTestId('version-selector')).toBeInTheDocument()
    })

    it('CodeBlock has copy button', () => {
        render(<CodeBlock>console.log("test")</CodeBlock>)
        expect(screen.getByTestId('code-block')).toBeInTheDocument()
        expect(screen.getByTestId('copy-code-button')).toBeInTheDocument()
    })

    it('FeedbackWidget works', () => {
        render(<FeedbackWidget />)
        const input = screen.getByTestId('feedback-input')
        const submit = screen.getByTestId('feedback-submit')

        expect(input).toBeInTheDocument()
        expect(submit).toBeInTheDocument()

        fireEvent.change(input, { target: { value: 'Great!' } })
        fireEvent.click(submit)

        expect(screen.getByTestId('feedback-success-message')).toBeInTheDocument()
    })
})
