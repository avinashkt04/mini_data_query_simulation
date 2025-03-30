let lastQuery: string | null = null;

const storeQuery = (query: string) => {
    lastQuery = query;
}

const getLastQuery = () => {
    return lastQuery;
}

export { storeQuery, getLastQuery };