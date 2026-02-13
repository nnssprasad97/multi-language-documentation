/**
 * @jest-environment node
 */
import { getDictionary } from "../src/lib/dictionary";
import fs from "fs/promises";
import path from "path";

// Mock fs/promises
jest.mock("fs/promises");

describe("getDictionary", () => {
    const mockLocales = {
        en: { title: "Hello" },
        es: { title: "Hola" },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // Setup fs.readFile mock
        (fs.readFile as jest.Mock).mockImplementation((filePath) => {
            const fileName = path.basename(filePath);
            if (fileName === "en.json") return Promise.resolve(JSON.stringify(mockLocales.en));
            if (fileName === "es.json") return Promise.resolve(JSON.stringify(mockLocales.es));
            return Promise.reject(new Error("File not found"));
        });
    });

    it("loads the correct dictionary for a supported locale", async () => {
        const dict = await getDictionary("es");
        expect(dict).toEqual(mockLocales.es);
        expect(fs.readFile).toHaveBeenCalledWith(expect.stringContaining("es.json"), "utf8");
    });

    it("fallbacks to English for an unsupported or missing locale", async () => {
        // We test the logic: if the key doesn't exist in the 'dictionaries' object map.
        // However, typescript logic in dictionary.ts checks keys. 
        // If we pass a random string 'xx', it should hit the fallback.
        const dict = await getDictionary("xx");
        expect(dict).toEqual(mockLocales.en);
        expect(fs.readFile).toHaveBeenCalledWith(expect.stringContaining("en.json"), "utf8");
    });
});
