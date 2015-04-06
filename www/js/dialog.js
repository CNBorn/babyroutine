  var Dialog = React.createClass({
    getInitialState: function() {
      return {
        className: 'modal fade'
      };
    },
    show: function() {
      this.setState({ className: 'modal fade show' });
      setTimeout(function() {
        this.setState({ className: 'modal fade show in' });
      }.bind(this), 0);
    },
    hide: function() {
      // Fade out the help dialog, and totally hide it after a set timeout
      // (once the fade completes)
      this.setState({ className: 'modal fade show' });
      setTimeout(function() {
        this.setState({ className: 'modal fade' });
      }.bind(this), 400);
    },
    render: function() {
      return (
        <div className={this.state.className}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" aria-hidden="true" onClick={this.hide}>Ã—</button>
                <h4 className="modal-title">{this.props.title}</h4>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.hide}>Close</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });