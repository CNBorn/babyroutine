var Header = React.createClass({
    render: function () {
        return (
                <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
                </header>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
                <div className="bar bar-standard bar-header-secondary">
                <input type="search" ref="searchKey" onChange={this.searchHandler} />
                </div>
        );
    }
});


var ActionListItem = React.createClass({
    render: function () {
        return (
                <li className="table-view-cell media">
                <a href={"#action/" + this.props.action.id}>
                <img src={"http://placehold.it/75/f0f0f0/9e9e9e&text=" + this.props.action.kindName} />
                {this.props.action.desc}
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
                <ul className="table-view">
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
                <div className="content">
                <ActionList actionList={this.state.actions}/>
                </div>
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
                <div className="content">
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <img className="media-object big pull-left" src={"http://placehold.it/75/f0f0f0/9e9e9e&text=" + this.state.action.kindName} />
                            <h1>{this.state.action.desc}</h1>
                        </li>
                    </ul>
                </div>
                </div>
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
