var React = require('react');

var Header = require('./components')['header'];

var SettingsPage = React.createClass({
    getInitialState: function() {
        return {exportz: ''};
    },
    handleExport: function() {
        this.setState({exportz: JSON.stringify(localStorage)});
        return;
    },
    render: function () {
        return (
                <div>
                <Header text="Settings" back="true"/>
                <div className="content">
                    <div className="card">

                    <ul className="table-view">
                    <li className="table-view-cell media">
                         ABCDEFG
                    </li>
                    </ul>

                    </div>

                <button className="btn btn-block"
            onClick={this.handleExport}>
                Export Data</button>

                <div className="card">
                <textarea readOnly="readonly" rows="20" value={this.state.exportz} />
                </div>

                </div>
                </div>
        );
    }
});

module.exports = SettingsPage;
