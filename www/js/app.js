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



var ActionListItem = React.createClass({
    render: function () {
        return (
                <li className="table-view-cell media">
                <a href={"#action/" + this.props.action.id}>
                <img className="media-object big pull-left" src={"img/" + this.props.action.kindName.toLowerCase() + ".png"} />
                <div class="media-body">
                    {moment(this.props.action.createdAt).format('HH:MM')} &nbsp;
                    {this.props.action.props.volume}
                    <p>{this.props.action.desc}</p>
                    <h6>{this.props.action.id}</h6>
                </div>
                </a>
                </li>
        );
    }
});

var ActionList = React.createClass({
    componentDidUpdate: function() {
        var node = this.getDOMNode();
        node.scrollTop = node.scrollHeight;
    },

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
        return {actions: []};
    },
    componentDidMount: function(){
        this.searchHandler();
        setInterval(this.searchHandler, 1000 * 10);
    },
    handleSubmit: function(e) {
        actionService.addAction(1, {volume: '120ml', duration:null}, '');
        this.searchHandler();
    },
    searchHandler:function(key) {
        key = '1,2,3,4';
        actionService.findByKind(key).done(function(actions) {
            this.setState({actions: actions});
        }.bind(this));
    },
    render: function () {
        return (
                <div>
                <Header text="BabyRoutine"/>
                <div className="content">
                    <ActionList actionList={this.state.actions}/>
                </div>
                <div className="bar bar-standard bar-footer">
                    <a href="#addEat" className="">
                        <button class="btn btn-positive">Hola</button>
                    </a>
                    <button className="btn btn-primary"
                    onClick={this.handleSubmit}>Button</button>
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
                            <img className="media-object big pull-left" src={"img/" + this.state.action.kindName.toLowerCase() + ".png"} />
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
    componentDidMount: function() {
        router.addRoute('', function() {
            this.setState({page: <HomePage />});
        }.bind(this));
        router.addRoute('action/:id', function(id) {
            this.setState({page: <ActionPage actionId={id} service={actionService}/>});
        }.bind(this));
        router.addRoute('addEat', function() {
            this.setState({page: <SubmitEat />});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }

});

React.render(<App/>, document.body);
