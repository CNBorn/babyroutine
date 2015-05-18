var React = require('../vendor/react');

var Header = require('./components')['header'];
var NavBar = require('./components')['navbar'];


var ActionListItem = React.createClass({
    handleRemove: function(id) {
        actionService.removeById(id);
    },

    render: function () {
        var propsVolume, propsDuration = '';
        var today = moment();
        itemMoment = moment(this.props.action.createdAt);
        if (today.startOf('day').isSame(itemMoment.startOf('day'))) {
            timeDiff = '';
        } else {
            timeDiff = itemMoment.from(today);
        }

        if (this.props.action.props) {
            propsVolume = this.props.action.props.volume;
            propsDuration = this.props.action.props.duration + 'min';
        }
        return (
                <li className="table-view-cell media">
                <a href={"#action/" + this.props.action.id}>
                <img className="media-object big pull-left" src={"img/" + this.props.action.kindName.toLowerCase() + ".png"} />
                <div className="media-body">
                    <h1>{moment(this.props.action.createdAt).format('HH:mm')} &nbsp;
                    {propsVolume}
                    </h1>
                    {timeDiff}
                    <p>{this.props.action.desc}</p>
                </div>
                </a>
                <span className="btn icon icon-close" onClick={this.handleRemove.bind(this, this.props.action.id)}></span>
                </li>
        );
    }
});

var ActionList = React.createClass({
    getInitialState: function() {
        return {actions: []};
    },
    componentDidMount: function(){
        key = '1,2,3,4';
        actionService.findByKind(key).done(function(actions) {
            this.setState({actions: actions});
        }.bind(this));
    },

    componentDidUpdate: function() {
        var node = this.getDOMNode();
        node.scrollTop = node.scrollHeight;
    },

    render: function () {
        var actions = this.state.actions.map(function (action, i) {
            return (
                    <ActionListItem key={action.id} action={action}
                    />
            );
        });

        return (
                <ul className="table-view">
                {actions}
                </ul>

        );
    }

});

// HomePage needs to change its var name
var HomePage = React.createClass({
    render: function () {
        return (
                <div>
                <Header text="BabyRoutine" back="true"/>
                <div className="content">
                    <ActionList />
                </div>
                <NavBar page='home'/>
                </div>
        );
    }
});

module.exports = HomePage;
