module.exports = Routing;

function Routing() {

}

Routing.prototype.index = function(req, res) {
    res.json({
        'api': 'v0.1',
        'desc': 'API Medical System. Dr Garces'
    });
}
