const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseQuery = (query: unknown): string => {
    if(!query || !isString(query)){
        throw new Error('Incorrect ot missing query');
    }
    return query;
};