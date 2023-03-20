function env<T>(name: string, defaultValue?: T): null | string | number | boolean | T {
    const value = process.env[name];

    if (!value) {
        return defaultValue as T;
    }

    if (value.toLowerCase() === 'null') {
        return null;
    }

    if (value.toLowerCase() === 'true') {
        return true;
    }

    if (value.toLowerCase() === 'false') {
        return false;
    }

    if (!Number.isNaN(Number(value))) {
        return Number(value);
    }

    return value;
}

export default env;
