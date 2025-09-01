import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Event } from "./components/Event";
import { sampleEvents } from "./testdata/sampleEvents";

const sampleEvent = sampleEvents[0]; // vezmeme první událost

describe("Event component", () => {
    it("renders title and location", () => {
        render(<Event {...sampleEvent} />);
        expect(screen.getByText(sampleEvent.title)).toBeInTheDocument();
        if (sampleEvent.location) {
            expect(screen.getByText(sampleEvent.location)).toBeInTheDocument();
        }
    });
});
