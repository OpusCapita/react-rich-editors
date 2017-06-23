import React, { Component, PropTypes } from 'react';

const propTypes = {
  items: PropTypes.array,
  left: PropTypes.number,
  top: PropTypes.number,
  selectedIndex: PropTypes.number,
  onItemClick: PropTypes.func,
  onItemMouseMove: PropTypes.func
};
const defaultProps = {
  items: [],
  left: 0,
  top: 0,
  selectedIndex: 0,
  onItemClick: () => {},
  onItemMouseMove: () => {}
};

export default
class AutocompleteItemsList extends Component {
  render() {
    let { left, top } = this.props;
    const listStyle = Object.assign({}, styles.list, {
      position: 'fixed',
      left,
      top
    });
    return (
      <ul style={listStyle}>
        {this.props.items.map((value, index) => {
          return (
            <li key={index}
              style={index === this.props.selectedIndex ? styles.selectedValue : styles.value}
              onClick={this.props.onItemClick.bind(this, index)}
              onMouseMove={this.props.onItemMouseMove.bind(this, index)}
            >
              {value}
            </li>
          );
        })}
      </ul>
    );
  }
}

AutocompleteItemsList.propTypes = propTypes;
AutocompleteItemsList.defaultProps = defaultProps;

const styles = {
  list: {
    margin: 0,
    padding: 0,
    border: '1px solid #ccc',
    background: 'white',
    boxShadow: '0 0 6px rgba(0,0,0,.24)',
    borderRadius: 2,
    listStyleType: 'none',
    zIndex: 1000
  },
  value: {
    margin: 0,
    padding: '8px 12px'
  },
  selectedValue: {
    margin: 0,
    padding: '8px 12px',
    background: '#eee',
    color: '#000',
    cursor: 'pointer'
  }
};
