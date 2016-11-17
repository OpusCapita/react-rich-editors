import React, { Component, PropTypes } from 'react';
import s from './RichEditorLinkInputForm.module.less';
import Button from 'jcatalog-react-ui-buttons/lib/Button';

export default
class RichEditorLinkInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      link: ''
    };
  }

  handleInputChange(name, event) {
    let nextValue = event.target.value;
    this.setState({ [name]: nextValue });
  }

  render() {
    let { translations } = this.props;
    let { text, link } = this.state;

    return (
      <div className={s.richEditorLinkInputForm}>
        <div className={s.form}>
          <input
            className={s.input}
            placeholder={translations.text}
            onChange={event => this.handleInputChange.call(this, 'text', event)}
            value={text}
          />
          <input
            className={s.input}
            placeholder={translations.link}
            onChange={event => this.handleInputChange.call(this, 'link', event)}
            value={link}
          />
        </div>
        <div className={s.buttonsBlock}>
          <div className={s.button}>
            <Button label={translations.submit} />
          </div>
        </div>
      </div>
    );
  }
}

RichEditorLinkInputForm.propTypes = {
  translations: PropTypes.object
};
RichEditorLinkInputForm.defaultProps = {
  translations: {
    text: 'Text',
    link: 'Link',
    submit: 'Apply'
  }
};
