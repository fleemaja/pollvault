import React, { Component } from 'react';
import { apiAddPoll } from '../actions/polls';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { categories } from '../helpers';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import validateInput from '../utils/validations/polls';
import { addFlashMessage } from '../actions/flashMessages';

class AddPollForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
      return {
        title: '',
        category: '',
        inputs: [
          { name: 'option-1', value: '' },
          { name: 'option-2', value: '' },
          { name: 'option-3', value: '' },
          { name: 'option-4', value: '' }
        ],
        errors: {},
        isValid: false
      }
    }

  validateForm = () => {
    const { title, category, inputs } = this.state;
    const choices = inputs.map(i => i['value']).filter(v => v !== '');
    const { isValid } = validateInput({ title, category, choices });
    this.setState({ isValid })
  }

  handleSubmit(e) {
    e.preventDefault();

    const { title, category, inputs } = this.state;
    const choices = inputs.map(i => i['value']).filter(v => v !== '');
    const { errors, isValid } = validateInput({ title, category, choices });
    if (isValid) {
      this.props.addPoll({ title, category, choices })
      this.props.handleClose();
      this.props.addFlashMessage({
        type: 'success',
        text: 'Poll Added!'
      })
      this.setState(this.initialState);
    } else {
      this.setState({ errors })
    }
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const updatedState = {}
    updatedState[property] = newVal

    this.setState(updatedState)
  }

  handleCategoryChange = (event, index, value) =>
    this.setState({category: value});

  handleOptionInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const inputs = this.state.inputs.map(i =>
      i['name'] === property ? { ...i, 'value': newVal } : i
    )

    this.setState({ inputs })
  }

  render() {
    const { title, category, inputs, errors, isValid } = this.state
    return (
      <section style={{margin: 20}}>
        <form onChange={this.validateForm}>
          <TextField
            value={title}
            name="title"
            onChange={this.handleInput.bind(this)}
            maxLength={140}
            floatingLabelText="Poll Title"
            floatingLabelFixed={true}
            errorText={errors['title']}
            style={{display: 'block'}}
          />
          <SelectField
            floatingLabelText="Category"
            floatingLabelFixed={true}
            value={category}
            name="category"
            errorText={errors['category']}
            onChange={this.handleCategoryChange}
          >
            {
              categories.map(c =>
                <MenuItem value={c} primaryText={c} />
              )
            }
          </SelectField>
          <section>
            {
              inputs.map(i => {
                const choiceNum = parseInt(i['name'].split("-")[1], 10);
                return (<TextField
                      value={i['value']}
                      name={i['name']}
                      maxLength={140}
                      onChange={this.handleOptionInput.bind(this)}
                      errorText={errors['choices'] && errors['choices'][choiceNum - 1]}
                      floatingLabelText={`Choice ${choiceNum} ${choiceNum > 2 ? "(optional)" : ""}`}
                      floatingLabelFixed={true}
                    />)
              })
            }
          </section>
          <RaisedButton
            label="Submit"
            disabled={!isValid}
            primary={true}
            onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPoll: (poll) => dispatch(apiAddPoll(poll)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddPollForm);
