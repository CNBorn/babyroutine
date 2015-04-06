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

var TestAddBtn = React.createClass({
    handleSubmit: function(e) {
        actionService.addAction(1, '120ml 00:00 - 00:25');
    },
    render: function() {
        return (
                <button className="btn btn-positive btn-outlined"
                        onClick={this.handleSubmit}>
                >Button</button>
        )
    }
});

var RecordFooter = React.createClass({
    addAction: function(kind, desc) {
        actionService.addAction(kind, desc);
    },
    render: function () {
        return (
                <div className="bar bar-standard bar-footer">
                <TestAddBtn />
                </div>
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
                <input type="search" ref="searchKey" onChange={this.searchHandler} value={this.props.searchKey} />
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
    render: function () {
        return (
                <div>
                <Header text="BabyRoutine"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <ActionList actionList={this.props.actions}/>
                </div>
                <RecordFooter />
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


var App = React.createClass({
    getInitialState: function() {
        return {
            searchKey: '',
            actions: [],
            page: null
        }
    },
    searchHandler:function(key) {
        actionService.findByKind(key).done(function(actions) {
            this.setState({searchKey: key, actions: actions, page: <HomePage searchKey={key} searchHandler={this.searchHandler} actions={actions}/>});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.setState({page: <HomePage searchKey={this.state.searchKey} searchHandler={this.searchHandler} actions={this.state.actions}/>});
        }.bind(this));
        router.addRoute('action/:id', function(id) {
            this.setState({page: <ActionPage actionId={id} service={actionService}/>});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }

});

React.render(<App/>, document.body);
