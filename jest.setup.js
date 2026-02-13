import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props) => {
        return {
            type: 'img',
            props: { ...props, alt: props.alt || 'mocked-image' },
            children: null,
        };
    },
}));
