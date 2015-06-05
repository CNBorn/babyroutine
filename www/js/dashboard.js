var React = require('../vendor/react');

var Header = require('./components')['header'];
var NavBar = require('./components')['navbar'];

var isDateToday = function(d) {
    return moment().isSame(moment(d),'day');
};

var getEatStatusByDayFunc = function(dayfunc, states) {
    var result = '';
    var l = states.length;
    console.log(l);
    console.log(states);
    for (var i = 0; i < l; i++) {
        console.log(l[i]);
        if (l[i] && dayfunc(l[i].createdAt)) {
            result += l[i].volume;
        }
    }
    return result;
};

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
        var eatSince = "";
        var eatPrompt = 'Haven\'t eat today.';
        var todayvol = "";
        if(this.props.actions) {
            todayvol = getEatStatusByDayFunc(isDateToday, this.props.actions);

            var first = this.props.actions[0];
            if(first){
                if(isDateToday(first.createdAt)) {
                    eatSince = countdown(moment(first.createdAt),
                                         null,
                                         countdown.HOURS,
                                         null,
                                         2).toString();
                    eatPrompt = 'since last time eat.';
                }
            }
        }

        return (
                <li className="table-view-cell media">
                <a className="navigate-right" href="#eat">
                <img className="media-object pull-left" src="img/eat.png" />
                <div className="media-body">
                {eatSince} {eatPrompt}
                <p>{todayvol} Today, 890ml Yesterday</p>
                <p>770ml last 3days avaerge, 660ml last week avaerage. </p>
                </div>
                </a>
                </li>
        );
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
                <EatEntryTab actions={this.state.actions}/>
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
