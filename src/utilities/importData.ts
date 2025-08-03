// utils/importData.ts
import { readFileSync } from "fs";
import { resolve } from "path";

export function importData(filePath: string) {
    const fullPath = resolve(__dirname, filePath);
    return JSON.parse(readFileSync(fullPath, "utf-8"));
}