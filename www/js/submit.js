var SubmitEat = React.createClass({
    getInitialState: function() {
        return {volume: 150,
                duration: 0,
               };
    },
    handleSubmit: function(e) {
        actionService.addAction(1, {volume: this.state.volume + 'ml',
                                    duration: this.state.duration}, '');
        router.load('');
    },
    handleVolumeChange: function(event) {
        this.setState({volume: event.target.value});
    },
    handleDurationChange: function(event) {
        this.setState({duration: event.target.value});
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
                        min="30" max="240" step="30"
                        value={this.state.volume} onChange={this.handleVolumeChange}/>
                        </div>

                        <div className="input-row">
                        <label>Duration</label>
                        <label className="slidevol">{this.state.duration + "min"}</label>
                        <input id="slide" type="range"
                            min="0" max="30" step="5"
                            value={this.state.duration} onChange={this.handleDurationChange}/>
                        </div>


                </form>

                <button className="btn btn-positive btn-block"
            onClick={this.handleSubmit}>
                Submit</button>

                </div>
                </div>
        );
    }
});
