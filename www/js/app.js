var React = require('../vendor/react');

var SubmitEat = require('./ui/submit');
var EatListPage = require('./ui/home');
var ActionPage = require('./ui/entity');
var FrontPage = require('./ui/dashboard');

var router = require('../vendor/router');

var App = React.createClass({
    getInitialState: function() {
        return {
            searchKey: '',
            actions: [],
            page: null
        }
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.setState({page: <FrontPage />});
        }.bind(this));
        router.addRoute('eat', function() {
            this.setState({page: <EatListPage />});
        }.bind(this));
        router.addRoute('action/:id', function(id) {
            this.setState({page: <ActionPage actionId={id} service={actionService}/>});
        }.bind(this));
        router.addRoute('addEat', function() {
            this.setState({page: <SubmitEat />});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }

});

module.exports = App;
