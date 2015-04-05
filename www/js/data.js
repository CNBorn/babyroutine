actionService = (function () {

    var findById = function (id) {
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
            var deferred = $.Deferred();
            var targetKinds = searchKey.split(",").map(Number);
            var results = actions.filter(function (element) {
                return targetKinds.indexOf(element.kind) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        actions = [
            {'id': 1, 'kind': 1, 'kindName': 'Eat', 'desc': '90ml 10:30pm - 10:50pm'},
            {'id': 2, 'kind': 2, 'kindName': 'Diaper', 'desc': '10:55pm'},
            {'id': 3, 'kind': 3, 'kindName': 'Sleep', 'desc': '11:00pm - 12:00pm'},
            {'id': 4, 'kind': 4, 'kindName': 'Poop', 'desc': '10:55pm'},
            {'id': 5, 'kind': 1, 'kindName': 'Eat', 'desc': '100ml 14:55-15:10'}
        ];

    // The public API
    return {
        findByKind: findByKind,
        findById: findById
    };

}());
