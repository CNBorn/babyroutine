var Header = React.createClass({
    render: function () {
        return (
                <h1 className="title">{this.props.text}</h1>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
                <input type="search" ref="searchKey" onChange={this.searchHandler} />
        );
    }
});


var ActionListItem = React.createClass({
    render: function () {
        return (
                <li>
                <a href={"#action/" + this.props.action.id}>
                {this.props.action.kindName} {this.props.action.desc}
            </a>
                </li>
        );
    }
});

var ActionList = React.createClass({
    render: function () {
        var actions = this.props.actionList.map(function (action) {
            return (
                    <ActionListItem key={action.id} action={action} />
            );
        });
        return (
                <ul>
                {actions}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    getInitialState: function() {
        return {actions: []}
    },
    searchHandler:function(key) {
        this.props.service.findByKind(key).done(function(result) {
            this.setState({searchKey: key, actions: result});
        }.bind(this));
    },
    render: function () {
        return (
                <div>
                <Header text="BabyRoutine"/>
                <SearchBar searchHandler={this.searchHandler}/>
                <ActionList actionList={this.state.actions}/>
                </div>
        );
    }
});

React.render(
        <HomePage service={actionService} />,
    document.body
);
