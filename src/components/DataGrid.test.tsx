// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import {DataGrid} from "./DataGrid.tsx";

afterEach(cleanup);

describe("DataGrid", () => {
    it("renders an empty table with the caption when there is no data", () => {
        const {container} = render(<DataGrid caption="Típusok" data={[]}/>);
        expect(screen.getByText("Típusok")).toBeTruthy();
        expect(container.querySelector("table")).not.toBeNull();
        expect(container.querySelectorAll("tbody tr")).toHaveLength(0);
    });

    it("renders the given column headers when there is no data", () => {
        const {container} = render(<DataGrid caption="x" data={[]} columns={["id", "name"]}/>);
        expect(Array.from(container.querySelectorAll("th")).map(th => th.textContent)).toEqual(["id", "name"]);
    });

    it("still renders rows when data exists", () => {
        const {container} = render(<DataGrid caption="x" data={[{id: "1", name: "a"}]}/>);
        expect(container.querySelectorAll("tbody tr")).toHaveLength(1);
    });
});
