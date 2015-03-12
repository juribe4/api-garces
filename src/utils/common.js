module.exports = new Utils();
function Utils() {}

Utils.prototype.handlingResponse = function(deferred, errMsg) {
    return function(err, response) {
        if(err) {
            console.log(errMsg);
            console.log(err);
            deferred.reject(err);
        }
        else{
            deferred.resolve(response);
        }
    };
};

Utils.prototype.handlingError = function(res) {
    return function (error) {
        res
            .status(404)
            .json({
                success: false,
                error: error
            });
    }
};

Utils.prototype.getRandom = function(list) {
    return list[Math.floor(Math.random() * list.length)];
};
