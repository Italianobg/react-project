import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CarCard from "./CarCard";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with or without Car Details", () => {
            act(() => {
                        render( < CarCard car = {
                                { make: "", model: "" }
                            }
                            />, container);
                        }); expect(container.textContent).toBe(" - Time for Fuel Up! ");

                    act(() => {
                            render( < CarCard car = {
                                    { make: "Volvo", model: "S80" }
                                }
                                />, container);
                            }); expect(container.textContent).toBe("Volvo - S80Time for Fuel Up! ");

                        act(() => {
                                render( < CarCard car = {
                                        { make: "Nissan", model: "X-Trail" }
                                    }
                                    />, container);
                                }); expect(container.textContent).toBe("Nissan - X-TrailTime for Fuel Up! ");
                        });