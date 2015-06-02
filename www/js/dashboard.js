var React = require('../vendor/react');

var Header = require('./components')['header'];
var NavBar = require('./components')['navbar'];

var GraphEntryTab = React.createClass({
    render: function() {
        return (
                <ul className="table-view">
                <li className="table-view-cell">
                <a className="navigate-right" href="#sleep">
                View Graph
                </a>
                </li></ul>
        );
    }
});

var HistoryEntryTab = React.createClass({
    render: function() {
        return (
                <ul className="table-view">
                <li className="table-view-cell">
                <a className="navigate-right" href="#sleep">
                View History
                </a>
                </li></ul>
        );
    }
});

var SleepEntryTab = React.createClass({
    render: function() {
        return (
                <ul className="table-view">
                <li className="table-view-cell media">
                <a className="navigate-right" href="#sleep">
                <img className="media-object pull-left" src="img/sleep.png" />
                <div className="media-body">
                2.5 hours since last sleep.
                <p>5 hours Today, 12 hours Yesterday</p>
                <p>12.5 hours last 3days avaerge, 11.9hours last week avaerage. </p>
                </div>
                </a>
                </li></ul>
        );

    }
});


var EatEntryTab = React.createClass({
    render: function () {

        if(this.props.action) {
            var isSameDay = moment().isSame(moment(this.props.action.createdAt),
                                            'day');
            var eatSince = "";
            var eatPrompt = "";
            if(isSameDay) {
                eatSince = countdown(moment(this.props.action.createdAt),
                                         null,
                                         countdown.HOURS,
                                         null,
                                         2).toString();
                eatPrompt = 'since last time eat.';
            } else {
                eatPrompt = 'Haven\'t eat today.';
            }

            return (
                    <li className="table-view-cell media">
                    <a className="navigate-right" href="#eat">
                    <img className="media-object pull-left" src="img/eat.png" />
                    <div className="media-body">
                    {eatSince} {eatPrompt}
                    <p>520ml Today, 890ml Yesterday</p>
                    <p>770ml last 3days avaerge, 660ml last week avaerage. </p>
                    </div>
                    </a>
                    </li>
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
        var first = this.state.actions[0];
        var today = moment().format('YYYY-MM-DD');

        return (
                <div>
                <Header text="BabyRoutine" back="false"/>

                <div className="content">

                <ul className="table-view">
                <li className="table-view-divider">{today}</li>
                <EatEntryTab action={first}/>
                <SleepEntryTab />
                <HistoryEntryTab />
                <GraphEntryTab />
                </ul>

                </div>
                <NavBar page='home'/>

                </div>
        );
    }
});


module.exports = FrontPage;
