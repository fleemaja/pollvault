import React, { Component } from 'react';
import { apiAddComment } from '../actions/comments';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import { letterToHexColor } from '../helpers';
import { addFlashMessage } from '../actions/flashMessages';

class AddCommentForm extends Component {
  state = {
    author: '',
    text: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const { text } = this.state;
    const parentId = this.props.parentId;
    if (parentId !== '' && text !== '') {
      this.props.addComment(parentId, { text });
      this.props.addFlashMessage({
        type: 'success',
        text: 'Comment Added!'
      })
      this.setState({ text: '' })
    }
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const updatedState = {}
    updatedState[property] = newVal;

    this.setState(updatedState)
  }

  render() {
    const { text } = this.state
    const { auth } = this.props
    const author = auth.user
    const letter = author.username && author.username.charAt(0);
    return (
      <section style={{margin: 20, maxWidth: 900}} onClick={this.props.handleCommentClick}>
        <form>
          {
            auth.isAuthenticated
            ? (
                author.photo ?
                  <Avatar src={`../uploads/${author.photo}`} alt="" /> :
                  <Avatar style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>
                    { letter }
                  </Avatar>
              )
            : <Avatar />
          }
          <TextField
            value={text}
            name='text'
            aria-label="Add A Public Comment"
            maxLength={500}
            onChange={this.handleInput.bind(this)}
            hintText="Add A Public Comment"
            style={{display: 'inline-block', width: 'calc(100% - 50px)', marginLeft: 10}}
          />
          <RaisedButton
            label="Comment"
            style={{float: 'right'}}
            primary={true}
            disabled={text === ''}
            onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (parentId, comment) =>
      dispatch(apiAddComment(parentId, comment)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm);
