import React, { Component } from 'react';
import Reply from './Reply';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

class Replies extends Component {
  state = {
    showReplies: false
  }

  toggleReplies = () => (
    this.setState({ showReplies: !this.state.showReplies })
  )

  render() {
    const { showReplies } = this.state
    const { replies, commentId } = this.props
    return (
      <section style={{marginLeft: 50}}>
        {
          replies.length > 0 &&
          <section>
            <section onClick={this.toggleReplies} style={{cursor: 'pointer'}}>
              {
                showReplies
                ? <h3 style={{display: 'inline-block'}}>
                    <span style={{verticalAlign: 'middle'}}>{ `Hide replies` }</span>
                    <ArrowUp style={{verticalAlign: 'middle'}} />
                  </h3>
                : <h3 style={{display: 'inline-block'}}>
                    <span style={{verticalAlign: 'middle'}}>
                      { `View ${replies.length === 1 ? '1 Reply' : `all ${replies.length} replies`}` }
                    </span>
                    <ArrowDown style={{verticalAlign: 'middle'}} />
                  </h3>
              }
            </section>
            {
              showReplies &&
              replies.map(r =>
                <Reply
                  reply={r}
                  handleCommentClick={this.props.handleCommentClick}
                  commentId={commentId} />
              )
            }
          </section>
        }
      </section>
    )
  }
}

export default Replies;
