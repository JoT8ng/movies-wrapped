const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown) : text is number => {
    return typeof text === 'number' || text instanceof Number;
};

export const parseQuery = (query: unknown): string => {
    if(!query || !isString(query)){
        throw new Error('Incorrect ot missing query');
    }
    return query;
};

export const parseIDQuery = (query: unknown): number => {
    if(!query || !isNumber(query) ){
        throw new Error('Incorrect ot missing query');
    }
    return query;
};