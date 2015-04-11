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
        return (
                <div>
                <Header text={this.state.action.kindName} />
                <div className="content">
                <div className="card">
                <ul className="table-view">
                <li className="table-view-cell media">
                <img className="media-object big pull-left" src={"img/" + this.state.action.kindName + ".png"} />
                <h1>{this.state.action.desc}</h1>
                <h1>{this.state.action.props}</h1>
                </li>
                </ul>
                </div>
                </div>
                </div>
        );
    }
});
