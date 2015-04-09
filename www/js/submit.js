var Timer = React.createClass({
    getInitialState: function() {
        return {time: 0};
    },
    tick: function() {
        var s = this.state.time + 1;
        this.setState({time: s});
    },
    componentDidMount: function() {
        this.timer = setInterval(this.tick, 1000);
    },
    render: function() {
        return (
        <span>{this.state.time}</span>);
    }
})


var SubmitEat = React.createClass({
    render: function () {
        return (
                <div>
                <Header text="Submit Eat"/>

                <div className="content">

                <form className="input-group">

                <div className="input-row">
                <label>Volume(ml)</label>
                <input type="text" placeholder="120" />
                </div>


                <div className="input-row">
                <label>Duration(min)</label>
                <input type="text" placeholder="10" />
                </div>

                </form>

                <ul className="table-view">
                <li className="table-view-cell">
                Live Timer for Duration Record
                <Timer />
                <div className="toggle active">
                <div className="toggle-handle"></div>
                </div>
                </li>
                </ul>



                <button className="btn btn-positive btn-block">Submit</button>


                </div>
                </div>
        );
    }
});
