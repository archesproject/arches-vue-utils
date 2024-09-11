import {
    ALT_LABEL,
    HIDDEN_LABEL,
    PREF_LABEL,
} from "@/arches_vue_utils/constants.ts";
import { getItemLabel, rankLabel } from "@/arches_vue_utils/utils.ts";

import type { Label } from "@/arches_vue_utils/types";

// Test utils
const asLabel = (
    valuetype: "prefLabel" | "altLabel" | "hiddenLabel",
    languageCode: string,
): Label => {
    return {
        value: "arbitrary",
        valuetype,
        languageCode,
    };
};

const systemLanguageCode = "en-ZA"; // arbitrary

describe("rankLabel() util", () => {
    const rank = (
        valuetype: "prefLabel" | "altLabel" | "hiddenLabel",
        labelLanguageCode: string,
        desiredLanguageCode: string,
    ) =>
        rankLabel(
            asLabel(valuetype, labelLanguageCode),
            desiredLanguageCode,
            systemLanguageCode,
        );

    // Test cases inspired from python module
    it("Prefers explicit region", () => {
        expect(rank(PREF_LABEL, "fr-CA", "fr-CA")).toBeGreaterThan(
            rank(PREF_LABEL, "fr", "fr-CA"),
        );
    });
    it("Prefers pref over alt", () => {
        expect(rank(PREF_LABEL, "fr", "fr-CA")).toBeGreaterThan(
            rank(ALT_LABEL, "fr", "fr-CA"),
        );
    });
    it("Prefers alt over hidden", () => {
        expect(rank(ALT_LABEL, "fr", "fr-CA")).toBeGreaterThan(
            rank(HIDDEN_LABEL, "fr", "fr-CA"),
        );
    });
    it("Prefers alt label in system language to anything else", () => {
        expect(rank(ALT_LABEL, systemLanguageCode, "en")).toBeGreaterThan(
            rank(PREF_LABEL, "de", "en"),
        );
    });
    it("Prefers region-insensitive match in system language", () => {
        expect(rank(PREF_LABEL, "en", "de")).toBeGreaterThan(
            rank(PREF_LABEL, "fr", "de"),
        );
    });
});

describe("getItemLabel() util", () => {
    it("Errors if no labels", () => {
        expect(() =>
            getItemLabel(
                { labels: [] },
                systemLanguageCode,
                systemLanguageCode,
            ),
        ).toThrow();
    });
    it("Falls back to system language", () => {
        expect(
            getItemLabel(
                {
                    labels: [
                        asLabel(PREF_LABEL, "de"),
                        asLabel(PREF_LABEL, systemLanguageCode),
                    ],
                },
                "fr",
                systemLanguageCode,
            ).languageCode,
        ).toEqual(systemLanguageCode);
    });
});
