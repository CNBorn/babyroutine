var React = require('../vendor/react');

var Header = require('./components')['header'];
var NavBar = require('./components')['navbar'];

var Dashboard = React.createClass({
    render: function () {

        var today = moment().format('YYYY-MM-DD');

        if(this.props.action) {
            var eatSince = countdown(moment(this.props.action.createdAt), null, countdown.HOURS|countdown.MINUTES).toString();
            return (
                    <ul className="table-view">
                    <li className="table-view-divider">{today}</li>
                    <li className="table-view-cell media">
                    <a className="navigate-right" href="#eat">
                    <img className="media-object pull-left" src="img/eat.png" />
                    <div className="media-body">
                    {eatSince} since last time eat.
                    <p>520ml Today, 890ml Yesterday</p>
                    <p>770ml last 3days avaerge, 660ml last week avaerage. </p>
                    </div>
                    </a>
                    </li></ul>
            );
        } else {
            return (<span />);
        }
    }
});

var FrontPage = React.createClass({
    getInitialState: function() {
        return {actions: []};
    },
    componentDidMount: function(){
        key = '1,2,3,4';
        actionService.findByKind(key).done(function(actions) {
            this.setState({actions: actions});
        }.bind(this));
    },
    render: function () {

        var dashboard = function(){
            return (
                    <Dashboard action={this.state.action[0]}
                    />
            );
        }
        var first = this.state.actions[0];
        if(this.state.action) {
            var dashboard = function(){
                return (<Dashboard action={this.state.action[0]}/>);
            }
        }

        return (
                <div>
                <Header text="BabyRoutine" back="false"/>
                <div className="content">
                <Dashboard action={first} />
                </div>
                <NavBar page='home'/>
                </div>
        );
    }
});


module.exports = FrontPage;
