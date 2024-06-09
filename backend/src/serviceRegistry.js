const services = {};

const registerService = (name, service) => {
    services[name] = service;
};

const getService = (name) => {
    return services[name];
};

module.exports = {
    registerService,
    getService,
};