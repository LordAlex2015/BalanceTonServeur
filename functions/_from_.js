const path = require('path');

_from_ = (...module) => {
    if (module[0] && module[0].startsWith('.')) {
        return require(path.resolve(...module));
    }
    return require(module[0]);
};

_from_.resolve = (request, options = null) => {
    if (request.startsWith('.')) {
        return require.resolve(path.resolve(request), options);
    }
    return require.resolve(request, options);
};
_from_.resolve.paths = request => {
    if (request.startsWith('.')) {
        return require.resolve.paths(path.resolve(request));
    }
    return require.resolve.paths(request);
};