import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../src/components/ThemeToggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
    useTheme: jest.fn(),
}));

describe("ThemeToggle", () => {
    it("renders toggle button", () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: "light",
            setTheme: jest.fn(),
        });

        render(<ThemeToggle />);
        const button = screen.getByTestId("theme-toggle");
        expect(button).toBeInTheDocument();
    });

    it("toggles theme on click", () => {
        const setThemeMock = jest.fn();
        (useTheme as jest.Mock).mockReturnValue({
            theme: "light",
            setTheme: setThemeMock,
        });

        render(<ThemeToggle />);
        const button = screen.getByTestId("theme-toggle");
        fireEvent.click(button);

        expect(setThemeMock).toHaveBeenCalledWith("dark");
    });
});
