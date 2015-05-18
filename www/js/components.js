var React = require('../vendor/react');

var Header = React.createClass({
    render: function () {
        return (
                <header className="bar bar-nav">
                <a href="javascript:history.back();" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <a className="icon icon-gear pull-right"></a>
                <h1 className="title">{this.props.text}</h1>
                </header>
        );
    }
});

var NavBar = React.createClass({
   render: function() {
       return (
               <nav className="bar bar-tab">
               <a className={'tab-item ' + (this.props.page==="home"?"active":"")} href="#">
               <span className="icon icon-home"></span>
               <span className="tab-label">Home</span>
               </a>
               <a className={'tab-item ' + (this.props.page==="addeat"?"active":"")} href="#addEat">
               <span className="icon icon-person"></span>
               <span className="tab-label">Profile</span>
               </a>
               </nav>
       );
   }
});

module.exports = {
    header: Header,
    navbar: NavBar
}
