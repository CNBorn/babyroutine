actionService = (function () {

    var findById = function (id) {
        actions = storage.get('babyroutine-actions');
        var deferred = $.Deferred();
        var action = null;
        var l = actions.length;
        for (var i = 0; i < l; i++) {
            if (actions[i].id == id) {
                action = actions[i];
                break;
            }
        }
        deferred.resolve(action);
        return deferred.promise();
    },

    findByKind = function (searchKey) {
        actions = storage.get('babyroutine-actions');
        var deferred = $.Deferred();
        var targetKinds = searchKey.split(",").map(Number);
        var results = actions.filter(function (element) {
            return targetKinds.indexOf(element.kind) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    },

    addAction = function (actionKind, desc) {
        var kindNames = {1: 'Eat',
                     2: 'Diaper',
                     3: 'Sleep',
                     4: 'Poop'};
        storage.push('babyroutine-actions', {'kind': actionKind,
                                             'kindName': kindNames[actionKind],
                                             'desc': desc});
    },

    // The public API
    return {
        findByKind: findByKind,
        findById: findById,
        addAction: addAction,
    };

}());
