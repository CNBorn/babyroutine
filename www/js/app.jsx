var React = require('../vendor/react');

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
            this.setState({page: <HomePage />});
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
