var SubmitEat = React.createClass({
    getInitialState: function() {
        return {volume: 150,
                time: 0,
                timerEnabled: true};
    },
    tick: function() {
        if (this.state.timerEnabled){
            var s = this.state.time + 1;
            this.setState({time: s});
        }
    },
    componentDidMount: function() {
        this.timer = setInterval(this.tick, 1000);
    },
    toggleTimer: function(event) {
        this.setState( { timerEnabled : !this.state.timerEnabled } );
        this.setState( { time: 0});
    },
    handleSubmit: function(e) {
        var duration = 0;
        if (this.state.timerEnabled){
            duration = this.state.time;
        }
        actionService.addAction(1, {volume: this.state.volume + 'ml',
                                    duration: duration}, '');
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
                <label>Duration(seconds)</label>
                <input type="text" placeholder={this.state.time} readonly={this.state.timerEnabled ? "true": "false"} />
                </div>


                <ul className="table-view input-row">
                                <li className="table-view-cell">
<div className={"toggle " + (this.state.timerEnabled ? "active" :"")}>
                    <div className="toggle-handle" onClick={this.toggleTimer}></div>
                </div>
</li>
</ul>



                </form>

                <button className="btn btn-positive btn-block"
            onClick={this.handleSubmit}>
                Submit</button>

                </div>
                </div>
        );
    }
});
