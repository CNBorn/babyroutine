var Header = React.createClass({
    render: function () {
        return (
                <h1 className="title">{this.props.text}</h1>
        );
    }
});

var ActionList = React.createClass({
    render: function () {
        return (
                <ul>
                <li>Eat: 90ml 10:30pm - 10:50pm</li>
                <li>Diaper: 10:55pm </li>
                <li>Sleep: 11:00pm - 12:00pm</li>
                </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
                <div>
                <Header text="BabyRoutine"/>
                <ActionList />
                </div>
        );
    }
});

React.render(
        <HomePage />,
    document.body
);
