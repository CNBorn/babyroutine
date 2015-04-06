var SubmitEat = React.createClass({
    render: function () {
        return (
                <div>
                <Header text="Submit Eat"/>
                <div className="content">
                <form className="input-group">
                <SubmitEatInput />

                <div className="input-row">
                <label>Duration(min)</label>
                <input type="text" placeholder="10" />          </div>



                </form>
                </div>
                </div>
        );
    }
});

var SubmitEatInput = React.createClass({
    render: function (){
        return (
            <div className="input-row">
            <label>Volume(ml)</label>
            <input type="text" placeholder="120" />
            </div>

        );
}
});
