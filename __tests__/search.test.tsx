"use client";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Search } from "../src/components/Search";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Mock FlexSearch
jest.mock("flexsearch", () => {
    return {
        Document: jest.fn().mockImplementation(() => ({
            add: jest.fn(),
            search: jest.fn().mockReturnValue([
                { field: "title", result: ["/en/docs/v1/introduction"] }
            ]),
        })),
    };
});

describe("Search", () => {
    const pushMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    });

    it("renders search input", () => {
        render(<Search />);
        expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    it("updates query state on input", () => {
        render(<Search />);
        const input = screen.getByTestId("search-input") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "intro" } });
        expect(input.value).toBe("intro");
    });
});
