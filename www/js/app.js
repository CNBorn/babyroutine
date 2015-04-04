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
                <h3>{this.state.action.desc}</h3>
                </div>
        );
    }
});

router.addRoute('', function() {
    React.render(
            <HomePage service={actionService} />,
        document.body
    );
});

router.addRoute('action/:id', function(id) {
    React.render(
            <ActionPage actionId={id} service={actionService}/>,
        document.body
    );
});
router.start();
