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
    handleRemove: function(id) {
        actionService.removeById(id);
        console.log('triggered' + id);
    },

    render: function () {
        var propsVolume, propsDuration = '';
        if (this.props.action.props) {
            propsVolume = this.props.action.props.volume;
            propsDuration = this.props.action.props.duration + 'min';
        }
        return (
                <li className="table-view-cell media">
                <a href={"#action/" + this.props.action.id}>
                <img className="media-object big pull-left" src={"img/" + this.props.action.kindName.toLowerCase() + ".png"} />
                <div class="media-body">
                    <h1>{moment(this.props.action.createdAt).format('HH:mm')} &nbsp;
                    {propsVolume} &nbsp; {propsDuration}
                    </h1>
                    <p>{this.props.action.desc}</p>
                </div>
                </a>
                <span className="btn icon icon-close" onClick={this.handleRemove.bind(this, this.props.action.id)}></span>
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
        var actions = this.props.actionList.map(function (action, i) {
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

var HomePage = React.createClass({
    getInitialState: function() {
        return {actions: []};
    },
    componentDidMount: function(){
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
<button className="btn-positive">
                <img src="img/Eat.png" width="30" height="30" /></button>
                    </a>
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
