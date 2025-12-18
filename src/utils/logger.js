export const Logger = {
    info: (message, context = {}) => {
        console.log(JSON.stringify({
            level: 'INFO',
            timestamp: new Date().toISOString(),
            message,
            ...context
        }));
    },
    error: (message, error, context = {}) => {
        console.error(JSON.stringify({
            level: 'ERROR',
            timestamp: new Date().toISOString(),
            message,
            error: error?.message || error,
            stack: error?.stack,
            ...context
        }));
    },
    warn: (message, context = {}) => {
        console.warn(JSON.stringify({
            level: 'WARN',
            timestamp: new Date().toISOString(),
            message,
            ...context
        }));
    }
};
