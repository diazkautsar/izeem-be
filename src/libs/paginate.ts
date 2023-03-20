export type typeModel = {
    count: number;
    rows: object[] | null | [];
};

export interface pagination {
    previous_page: number | null;
    current_page: number;
    next_page: number | null;
    total: number;
    per_page: number;
    data: object[] | null;
}

const paginate = async (model: typeModel, pageSize: number, pageLimit: number): Promise<pagination | null> => {
    try {
        const page = pageSize <= 0 ? 1 : pageSize;
        const limit = pageLimit <= 0 ? 10 : pageLimit;

        // take in the model, take in the options
        let { count, rows } = model;

        return {
            previous_page: getPreviousPage(page),
            current_page: page,
            next_page: getNextPage(page, limit, count),
            total: count,
            per_page: limit,
            data: rows,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getNextPage = (page: number, limit: number, total: number): number | null => {
    if (total / limit > page) {
        return page + 1;
    }

    return null;
};

const getPreviousPage = (page: number): null | number => {
    if (page <= 1) {
        return null;
    }
    return page - 1;
};

export default paginate;
