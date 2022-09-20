
export const VerticalSpacing = 3;

export function cleanVal(val) {
    if (typeof val === "number") {
        return val;
    }

    let actual = val;

    // Support vals like 1-raid-2, where 1 is the val and the rest is just there
    // to make option values unique.
    if (typeof val === "string") {
        const parts = val.split("-");
        actual = parts[0];
    }

    return Number.parseFloat(actual);
}

