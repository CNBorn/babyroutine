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
    getInitialState: function() {
        return {volume: 150,
                timerEnabled: true};
    },
    toggleTimer: function(event) {
        this.setState( { timerEnabled : !this.state.timerEnabled } );
    },
    handleSubmit: function(e) {
        actionService.addAction(1, {volume: this.state.volume + 'ml',
                                    duration:null}, '');
        router.load('');
    },
    handleVolumeChange: function(event) {
        this.setState({volume: event.target.value});
    },
    render: function () {
        return (
                <div>
                <Header text="Submit Eat"/>
                    <div className="content">
                    <form className="input-group">

                        <div className="input-row">
                        <label>Volume</label>
                        <label className="slidevol">{this.state.volume + "ml"}</label>
                        <input id="slide" type="range"
                        min="30" max="310" step="30"
                        value={this.state.volume} onChange={this.handleVolumeChange}/>
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
                <div className={"toggle " + (this.state.timerEnabled ? "active" :"")}>
                <div className="toggle-handle" onClick={this.toggleTimer}></div>
                </div>
                </li>
                </ul>

                <button className="btn btn-positive btn-block"
            onClick={this.handleSubmit}>
                Submit</button>

                </div>
                </div>
        );
    }
});
