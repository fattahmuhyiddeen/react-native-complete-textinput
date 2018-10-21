import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
import FloatingLabel from "react-native-floating-labels";

const styles = StyleSheet.create({
  floatingLabel: { backgroundColor: "transparent" },
  input: { borderWidth: 0, fontSize: 14 },
  formInput: { borderWidth: 0, borderBottomWidth: 1.5, marginTop: 10 }
});

const showImage = require("./show.png");
const hideImage = require("./hide.png");

class CompleteTextInput extends Component {
  state = { isSecure: true };
  focus = () => this.inputObject.focus()
  render() {
    const {
      onChangeText,
      placeholder,
      isEnable,
      value,
      secureTextEntry,
      textColor,
      customStyle
    } = this.props;
    const { isSecure } = this.state;
    return (
      <View style={{ width: "100%" }}>
        <FloatingLabel
          labelStyle={styles.floatingLabel}
          inputStyle={[styles.input, { color: textColor }]}
          autoCapitalize="none"
          onSubmitEditing={Keyboard.dismiss}
          style={[styles.formInput, customStyle]}
          color={textColor}
          editable={isEnable}
          ref={c => { this.inputObject = c }}
          underlineColorAndroid="transparent"
          value={value}
          multiline={false}
          returnKeyType="done"
          onChangeText={t => onChangeText(t)}
          // selectionColor={"blue"}
          {...this.props}
          secureTextEntry={secureTextEntry && isSecure}
        // onBlur={this.onBlur}
        >
          {placeholder}
        </FloatingLabel>
        {secureTextEntry && (
          <TouchableOpacity
            style={{ position: "absolute", right: 0, top: 20 }}
            activeOpacity={1}
            onPressIn={() => this.setState({ isSecure: !this.state.isSecure })}
          // onPressIn={() => this.setState({ isSecure: false })}
          // onPressOut={() => this.setState({ isSecure: true })}
          >
            <Image
              style={{ tintColor: textColor, width: 25, height: 25 }}
              source={isSecure ? hideImage : showImage}
              resizeMode='contain'
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
  customStyle: PropTypes.object
};

CompleteTextInput.defaultProps = {
  isEnable: true,
  placeholder: "Input",
  onChangeText: () => { },
  secureTextEntry: false,
  value: "",
  textColor: "black",
  customStyle: {}
};
export default CompleteTextInput;
