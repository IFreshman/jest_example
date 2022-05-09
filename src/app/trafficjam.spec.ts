import {TrafficJam} from "./trafficjam";


describe("A traffic jam", function () {
    describe("has specific vehicle types", () => {
        it("can consist of cars", () => {
            let queue = "CCC",
                trafficJam = new TrafficJam(queue),
                trafficResult = trafficJam.print();

            expect(trafficResult).toBe("/OO\\ /OO\\ /OO\\");
        });

        it("can consist of buses", () => {
            let queue = "BBB",
                trafficJam = new TrafficJam(queue),
                trafficResult = trafficJam.print();

            expect(trafficResult).toBe("-/OOOO\\ -/OOOO\\ -/OOOO\\");
        });

        it("can consist of pickups", () => {
            let queue = "PPP",
                trafficJam = new TrafficJam(queue),
                trafficResult = trafficJam.print();

            expect(trafficResult).toBe("/O\\__ /O\\__ /O\\__");
        });

        it("can consist of trucks", () => {
            let queue = "TTT",
                trafficJam = new TrafficJam(queue),
                trafficResult = trafficJam.print();

            expect(trafficResult).toBe("/O|___ /O|___ /O|___");
        });

        it("can consist of any mix of vehicles", () => {
            let queue = "CBBTP",
                trafficJam = new TrafficJam(queue),
                trafficResult = trafficJam.print();

            expect(trafficResult).toBe("/OO\\ -/OOOO\\ -/OOOO\\ /O|___ /O\\__");
        });

        describe("with additional loading state", () => {
            it("changes eventually the look of the vehicle", () => {
                let queue = "CTPT",
                    trafficJam = new TrafficJam(queue),
                    trafficResult;

                trafficResult = trafficJam.print();
                expect(trafficResult).toEqual("/OO\\ /O|___ /O\\__ /O|___");

                trafficJam.fillCargo();
                trafficResult = trafficJam.print();
                expect(trafficResult).toEqual("/OO\\ /O|___ /O\\__ /O|___");

                trafficJam.fillCargo();
                trafficResult = trafficJam.print();
                expect(trafficResult).toEqual("/OO\\ /O|### /O\\__ /O|___");

                trafficJam.fillCargo();
                trafficResult = trafficJam.print();
                expect(trafficResult).toEqual("/OO\\ /O|### /O\\## /O|___");

                trafficJam.fillCargo();
                trafficResult = trafficJam.print();
                expect(trafficResult).toEqual("/OO\\ /O|### /O\\## /O|###");
            });

            it("returns false if nothing could be loaded, because everything was loaded", () => {
                let queue = "CT",
                    trafficJam = new TrafficJam(queue);

                expect(trafficJam.fillCargo()).toBe(true);
                expect(trafficJam.fillCargo()).toBe(true);
                expect(trafficJam.fillCargo()).toBe(false);
            });
        });
    });

    describe("has rudimentary error handling", () => {
        it("throws an error if it does not now the vehicle type", () => {
            expect(() => new TrafficJam("F")).toThrowError();
        });
    });

    describe("is gracefully with empty queue", () => {
        it("not throws an error if given queue is empty", () => {
            expect(() => new TrafficJam()).not.toThrowError();
        });
    });

    describe("can be modified", () => {
        it("can remove the first vehicle", () => {
            let queue = "CPCBC",
                trafficJam = new TrafficJam(queue),
                trafficResult;

            trafficJam.removeFirst();
            trafficResult = trafficJam.print();
            expect(trafficResult).toEqual("/O\\__ /OO\\ -/OOOO\\ /OO\\");
        });

        it("can remove the last vehicle", () => {
            let queue = "CPCBC",
                trafficJam = new TrafficJam(queue),
                trafficResult;

            trafficJam.removeLast();
            trafficResult = trafficJam.print();
            expect(trafficResult).toEqual("/OO\\ /O\\__ /OO\\ -/OOOO\\");
        });
    });
});
