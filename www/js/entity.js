var React = require('../vendor/react');

var Header = require('./components')['header'];
var NavBar = require('./components')['navbar'];


var ActionPage = React.createClass({
    getInitialState: function() {
        return {action: {}};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.actionId).done(function(result) {
            this.setState({action: result});
        }.bind(this));
    },
    render: function () {
        var propsVolume, propsDuration = '';
        if (this.state.action.props) {
            propsVolume = this.state.action.props.volume;
            propsDuration = this.state.action.props.duration + 'min';
        }

        return (
                <div>
                <Header text={this.state.action.kindName} back="true"/>
                <div className="content">
                <div className="card">
                <ul className="table-view">
                <li className="table-view-cell media">
                <img className="media-object big pull-left" src={"img/" + this.state.action.kindName + ".png"} />
                <h1>{moment(this.state.action.createdAt).format('HH:mm')} &nbsp;
            {propsVolume} &nbsp; {propsDuration}
            </h1>

                </li>
                </ul>
                </div>
                </div>
                </div>
        );
    }
});

module.exports = ActionPage;
