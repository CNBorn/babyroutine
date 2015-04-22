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

    removeById = function (id) {
        actions = storage.get('babyroutine-actions');
        var l = actions.length;
        var delIndex = null;
        for (var i = 0; i < l; i++) {
            if (actions[i].id == id) {
                delIndex = i;
            }
        }
        if(delIndex) {
            actions.pop(delIndex);
        }
        storage.set('babyroutine-actions', actions);
    },

    findByKind = function (searchKey) {
        actions = storage.get('babyroutine-actions').reverse();
        var deferred = $.Deferred();
        var targetKinds = searchKey.split(",").map(Number);
        if(actions != null) {
            var results = actions.filter(function (element) {
                return targetKinds.indexOf(element.kind) > -1;
            });
        }
        deferred.resolve(results);
        return deferred.promise();
    },

    addAction = function (actionKind, props, time, desc) {
        var kindNames = {1: 'Eat',
                     2: 'Diaper',
                     3: 'Sleep',
                     4: 'Poop'};
        storage.push('babyroutine-actions', {'id': uuid.v1(),
                                             'kind': actionKind,
                                             'kindName': kindNames[actionKind],
                                             'props': props,
                                             'desc': desc,
                                             'createdAt': time});
    };

    // Debug Only, Clear Store
    // storage.empty();


    // The public API
    return {
        findByKind: findByKind,
        findById: findById,
        addAction: addAction,
        removeById: removeById
    };

}());
