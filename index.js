import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-native-floating-labels';

const styles = StyleSheet.create({
  floatingLabel: { backgroundColor: 'transparent' },
  input: { borderWidth: 0 },
  formInput: { borderWidth: 0, borderBottomWidth: 1.5, marginTop: 10 },
});

const showImage = require('./show.png');
const hideImage = require('./hide.png');

class CompleteTextInput extends Component {
  state = { isSecure: true };
  render() {
    const {
      onChangeText,
      placeholder,
      isEnable,
      value,
      secureTextEntry,
      textColor,
    } = this.props;
    const { isSecure } = this.state;
    return (
      <View>
        <FloatingLabel
          labelStyle={styles.floatingLabel}
          inputStyle={[styles.input, { color: textColor }]}
          autoCapitalize="none"
          onSubmitEditing={Keyboard.dismiss}
          style={styles.formInput}
          editable={isEnable}
          value={value}
          multiline={false}
          secureTextEntry={secureTextEntry && isSecure}
          returnKeyType="done"
          onChangeText={(t) => {
            onChangeText(t);
          }}
          selectionColor={'blue'}
        // onBlur={this.onBlur}
        >
          {placeholder}
        </FloatingLabel>
        {secureTextEntry && (
          <TouchableOpacity
            style={{ position: 'absolute', right: 0, top: 6 }}
            activeOpacity={1}
            onPressIn={() => {
              this.setState({ isSecure: false });
            }}
            onPressOut={() => {
              this.setState({ isSecure: true });
            }}
          >
            <Image
              style={{ tintColor: textColor }}
              source={isSecure ? hideImage : showImage}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

CompleteTextInput.propTypes = {
  isEnable: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  textColor: PropTypes.string,
};

CompleteTextInput.defaultProps = {
  isEnable: true,
  placeholder: 'Input',
  onChangeText: () => { },
  secureTextEntry: false,
  value: '',
  textColor: 'black',
};

export default CompleteTextInput;
