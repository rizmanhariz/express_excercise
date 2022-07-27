const dataConsolidate = async (req, res, next) => {
    // consolidates request body/url query into single accessible object
    if (req.method.toLowerCase() == 'get'){
        req.data = req.query;
    } else {
        req.data = req.body;
    };
    next();
};

module.exports = dataConsolidate;