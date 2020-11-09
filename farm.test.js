const {
    get_yield_for_plant,
    get_yield_for_crop,
    get_total_yield,
    get_costs_for_crop,
    get_revenue_for_crop,
    get_profit_for_crop,
    get_total_profit,
} = require("./farm");

describe("get_yield_for_plant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -30,
                high: -60,
            },
        },
    };

    const environment_factors = {
        sun: "low",
        wind: "medium",
    };

    test("Get yield for plant with no environment factors", () => {
        expect(get_yield_for_plant(corn, environment_factors)).toBe(10.5);
    });
});

describe("get_yield_for_crop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
    
        const environment_factors = {
            sun: "low",
            wind: "medium",
        };
        const input = {
            crop: corn,
            num_crops: 10,
        };
        expect(get_yield_for_crop(input, environment_factors)).toBe(105);
    });
});

describe("get_total_yield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 40,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const environment_factors = {
            sun: "low",
            wind: "medium",
        };
        const crops = [
            { crop: corn, num_crops: 5 },
            { crop: pumpkin, num_crops: 2 },
        ];
        expect(get_total_yield({ crops }, environment_factors)).toBe(80.5);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 40,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const environment_factors = {
            sun: "low",
            wind: "medium",
        };
        const crops = [{ crop: corn, num_crops: 0 }];
        expect(get_total_yield({ crops }, environment_factors)).toBe(0);
    });
});

describe("get_costs_for_crop", () => {
    const corn = {
        name: "corn",
        yield: 30,
        costs: 1,
    };

    const input = {
        crop: corn,
        num_crops: 10,
    };

    test("Get the costs for a crop", () => {
        expect(get_costs_for_crop(input)).toBe(10);
    });
});

describe("get_revenue_for_crop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1,
        sale_price: 4,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -30,
                high: -60,
            },
        },
    };

    const environment_factors = {
        sun: "low",
        wind: "medium",
    };
    const input = {
        crop: corn,
        num_crops: 10,
    };

    test("Get the revenue for the crop total with outside influences", () => {
        expect(get_revenue_for_crop(input, environment_factors)).toBe(41.99999999999999);
    });
});

describe("get_profit_for_crop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        costs: 1,
        sale_price: 4,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -30,
                high: -60,
            },
        },
    };

    const environment_factors = {
        sun: "low",
        wind: "medium",
    };

    const input = {
        crop: corn,
        num_crops: 10,
    };
    test("Get the profits for a crop without outside influences", () => {
        expect(get_profit_for_crop(input, environment_factors)).toBe(31.999999999999993);
    });
});

describe("get_total_profit", () => {
    test("Calculate total profits of multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            sale_price: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            sale_price: 7,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                },
            },
        };
        const environment_factors = {
            sun: "low",
            wind: "medium",
        };
        const crops = [
            { crop: corn, num_crops: 5 },
            { crop: pumpkin, num_crops: 2 },
        ];
        expect(get_total_profit({ crops }, environment_factors)).toBe(31.599999999999994);
    })
})