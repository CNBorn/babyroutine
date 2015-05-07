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
                    {timeDiff} {propsDuration}
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

var HomePage = React.createClass({
    render: function () {
        return (
                <div>
                <Header text="BabyRoutine"/>
                <div className="content">
                    <ActionList />
                </div>
                <div className="bar bar-standard bar-footer">
                    <a href="#addEat" className="">
<button className="btn-positive">
                <img src="img/eat.png" width="30" height="30" /></button>
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
