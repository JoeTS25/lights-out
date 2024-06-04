import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

describe("<Cell /> rendering", function () {
    let container;
// add a table row element 
    beforeEach(function() {
        let tr = document.createElement("tr")
        container = document.body.appendChild(tr);
    });

    it("renders w/o crashing", function () {
        render(<Cell />, { container });
    });

    it("matches lit snapshot", function () {
        const { asFragment } = render(<Cell isLit />, { container });
        expect(asFragment()).toMatchSnapshot();
    });

    it("matches unlit snapshot", function () {
        const { asFragment } = render(<Cell />, { container });
        expect(asFragment()).toMatchSnapshot();
    });
});