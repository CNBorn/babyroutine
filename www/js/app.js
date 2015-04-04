var Header = React.createClass({
    render: function () {
        return (
                <h1 className="title">{this.props.text}</h1>
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
    render: function () {
        var actions = [
            {kindName: 'Eat', desc: '90ml 10:30pm - 10:50pm'},
            {kindName: 'Diaper', desc: '10:55pm'},
            {kindName: 'Sleep', desc: '11:00pm - 12:00pm'},
            {kindName: 'Poop', desc: '10:55pm'}
        ];
        return (
                <div>
                <Header text="BabyRoutine"/>
                <ActionList actionList={actions}/>
                </div>
        );
    }
});

React.render(
        <HomePage />,
    document.body
);
