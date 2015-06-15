var React = require('react');

var SubmitEat = require('./ui/submit');
var EatLogPage = require('./ui/eatlog');
var ActionPage = require('./ui/entity');
var FrontPage = require('./ui/dashboard');
var SettingsPage = require('./ui/settings');

var router = require('../vendor/router.js');

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
            this.setState({page: <EatLogPage />});
        }.bind(this));
        router.addRoute('action/:id', function(id) {
            this.setState({page: <ActionPage actionId={id} service={actionService}/>});
        }.bind(this));
        router.addRoute('addEat', function() {
            this.setState({page: <SubmitEat />});
        }.bind(this));
        router.addRoute('settings', function() {
            this.setState({page: <SettingsPage />});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }

});

module.exports = App;
