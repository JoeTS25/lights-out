import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("<Board /> rendering", function () {
    describe("initial board state", function () {
        it("renders w/o crashing", function () {
            render(<Board />);
        });

        it("matches snapshot for full board", function () {
            const { asFragment } = render(<Board chanceLightStartsOn={1}/>);
            expect(asFragment()).toMatchSnapshot();
        });
    })

    describe("win board state", function () {
        it("shows win state", function () {
            const { getByText } = render(<Board chanceLightStartsOn={0} />);
            expect(getByText("You Win!")).toBeInTheDocument();
        });
    });

    describe("clicking a cell", function () {
        it("toggles light on clicked cell", function () {
            const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} 
            />,);
            const cells = getAllByRole("button");
            cells.forEach(cell => {
                // light up all cells
                expect(cell).toHaveClass("Cell-lit");
            });
            // click middle cell
            fireEvent.click(cells[4]);
            /* If entered index is equal to any of the litIdx indeces, expect that 
            index to be lit up, if not, then it should not be lit */
            let litIdx = [0, 2, 6, 8];
            cells.forEach((cell, idx) => {
                if (litIdx.includes(idx)) {
                    expect(cell).toHaveClass("Cell-lit");
                } else {
                    expect(cell).not.toHaveClass("Cell-lit")
                }
            });
        });
    })
})