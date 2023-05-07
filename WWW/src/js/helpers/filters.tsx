export const splitIds = (uriValue: string): Array<number> => {
    return !!uriValue ? uriValue.split(',').map((n) => Number(n)) : []
}
