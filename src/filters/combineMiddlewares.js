export function combineMiddleware(handlers = {}) {
    return store => next => async (action = {}) => {
        if (handlers[action.type]) {
            return handlers[action.type](store, next, action);
        }

        next(action);
    };
}