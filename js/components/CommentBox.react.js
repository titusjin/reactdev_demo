var React = require('react');
var CommentBoxStore = require('../stores/CommentStore');
var CommentBoxAction = require('../actions/CommentBoxAction');


var CommentBox = React.createClass({
  getInitialState: function() {
    return CommentBoxStore.getAllData();
  },
  componentDidMount : function(){
      CommentBoxStore.addChangeListener('commentChange',this._onCommentChange);
  },
  componentWillUnmount : function(){
    CommentBoxStore.removeChangeListener('commentChange',this._onCommentChange);  
  },
  _onCommentChange : function(){
     this.setState(CommentBoxStore.getAllData());
  },
  /*
    User trigger action  
  */
  handleCommentSubmit: function(comment) {
    // calling action to trigger dispatcher
    CommentBoxAction.addNewComment(comment);
  },
  handleCancelSubmit : function(e){
    e.preventDefault();
    this.state.data.pop();
    this.setState({data : this.state.data});
  },
  handleReset: function(e){
    e.preventDefault();
    var initialState = this.getInitialState();
    this.setState(initialState);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
		    <input type="submit" value="Reset" onClick={this.handleReset} />
        <CancelForm onCancelSubmit={this.handleCancelSubmit}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  // removeItem: function(selectId){
  //   for(var i = this.props.data.length  ; i-- ; ){
		//   console.log(this.props.data[i].author);

		//   if(this.props.data[i].author == selectId){
  //       this.props.data.splice(i,1);
  //       break;
  //     }
  //   }
  //   this.setState(this.props.data);
  // },
  removeItem: function(selectId){
    CommentBoxStore.removeComment(selectId);
  },
  render: function() {
    var self = this;
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} text={comment.text} triggerRemove={self.removeItem}/>
      );
    });
    return (
      <div className="commentList">
          {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  handleRemove: function(e){
    var targetId = e.target.getAttribute('data-key');
    this.props.triggerRemove(targetId);
  },
  render: function() {
    console.log('Comment render....');

    var rawMarkup = this.props.author.toString();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </h2>
		{this.props.text}
		<button data-key={this.props.author} type='button' onClick={this.handleRemove}>remove</button>
      </div>
    );
  }
});

var CancelForm = React.createClass({
    render:function(){
        return (
          <form className="commentForm" onSubmit={this.props.onCancelSubmit}>
            <input type="submit" value="remove last comment" />
          </form>   
        );
    }
});


var CommentForm = React.createClass({
  handleSubmit : function(e){
       e.preventDefault();
       var author = this.refs.author.getDOMNode().value.trim();
       var text = this.refs.text.getDOMNode().value.trim();
              
       this.props.onCommentSubmit({author: author, text: text});
       
       this.refs.author.getDOMNode().value = '';
       this.refs.text.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" /><br />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});


module.exports = CommentBox;
