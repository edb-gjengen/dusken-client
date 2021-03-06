import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Spinner, Button, Text, Icon, Toast } from 'native-base';
import { StyleSheet, View } from 'react-native';
import * as EmailValidator from 'email-validator';

import theme from '../../theme';

export default class UserRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      errors: {},
      touched: new Set(),
    };
  }

  validateForm(triggeredBy) {
    const fieldNames = ['firstName', 'lastName', 'email', 'phoneNumber', 'password'];

    const errors = Object.assign({}, this.state.errors);
    const touched = new Set(this.state.touched).add(triggeredBy);

    /* No empty fields */
    fieldNames.forEach((key) => {
      const value = this.state[key];
      if (value === '') {
        errors[key] = 'kan ikke være tomt';
      } else if (key === 'email' && !EmailValidator.validate(value)) {
        errors[key] = 'er ikke en gyldig e-post';
      } else {
        delete errors[key];
      }
    });

    this.setState({ errors, touched });
  }

  fieldHasError(field) {
    return this.state.touched.has(field) && field in this.state.errors;
  }

  canSubmitForm() {
    return Object.keys(this.state.errors).length === 0;
  }

  firstNameInput() {
    return (
      <Item error={this.fieldHasError('firstName')}>
        <Label>Fornavn</Label>
        <Input
          autoFocus={true}
          returnKeyType="next"
          onChangeText={(firstName) => {
            this.setState({ firstName }, () => {
              this.validateForm('firstName');
            });
          }}
          onSubmitEditing={() => {
            this.lastNameInputRef._root.focus();
          }}
          value={this.state.firstName}
        />
        {this.fieldHasError('firstName') && <Icon name="close-circle" />}
      </Item>
    );
  }

  lastNameInput() {
    return (
      <Item error={this.fieldHasError('lastName')}>
        <Label>Etternavn</Label>
        <Input
          ref={(ref) => {
            this.lastNameInputRef = ref;
          }}
          returnKeyType="next"
          onChangeText={(lastName) => {
            this.setState({ lastName }, () => {
              this.validateForm('lastName');
            });
          }}
          onSubmitEditing={() => {
            this.emailInputRef._root.focus();
          }}
          value={this.state.lastName}
        />
        {this.fieldHasError('lastName') && <Icon name="close-circle" />}
      </Item>
    );
  }

  emailInput() {
    return (
      <Item error={this.fieldHasError('email')}>
        <Label>E-post</Label>
        <Input
          ref={(ref) => {
            this.emailInputRef = ref;
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={(email) => {
            this.setState({ email }, () => {
              this.validateForm('email');
            });
          }}
          onSubmitEditing={() => {
            this.phoneInputRef._root.focus();
          }}
          value={this.state.email}
        />
        {this.fieldHasError('email') && <Icon name="close-circle" />}
      </Item>
    );
  }

  phoneNumberInput() {
    return (
      <Item error={this.fieldHasError('phoneNumber')}>
        <Label>Mobilnummer</Label>
        <Input
          ref={(ref) => {
            this.phoneInputRef = ref;
          }}
          returnKeyType="next"
          keyboardType="phone-pad"
          onChangeText={(phoneNumber) => {
            this.setState({ phoneNumber }, () => {
              this.validateForm('phoneNumber');
            });
          }}
          onSubmitEditing={() => {
            this.passwordInputRef._root.focus();
          }}
          value={this.state.phoneNumber}
        />
        {this.fieldHasError('phoneNumber') && <Icon name="close-circle" />}
      </Item>
    );
  }

  passwordInput() {
    return (
      <Item error={this.fieldHasError('password')}>
        <Label>Passord</Label>
        <Input
          ref={(ref) => {
            this.passwordInputRef = ref;
          }}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(password) => {
            this.setState({ password }, () => {
              this.validateForm('password');
            });
          }}
          onSubmitEditing={this.onRegisterPress}
          value={this.state.password}
        />
        {this.fieldHasError('password') && <Icon name="close-circle" />}
      </Item>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.registerError !== nextProps.registerError) {
      this.setState({ errors: nextProps.registerError });
    }
  }

  showNonFieldError = () => {
    const errors = this.props.registerError;
    if (Object.keys(errors).length !== 0 && 'non_field_errors' in errors) {
      const err = errors.non_field_errors;
      const errorFormatted = err ? err[0] : 'Kunne ikke registrere bruker, prøv igjen...';
      return (
        <View style={styles.errorBox}>
          <Text style={styles.errorMessage}>{errorFormatted}</Text>
        </View>
      );
    }
    if (Object.keys(errors).length !== 0 && 'detail' in errors) {
      const err = errors.detail;
      const errorFormatted = err || 'Kunne ikke registrere bruker, prøv igjen...';
      return (
        <View style={styles.errorBox}>
          <Text style={styles.errorMessage}>{errorFormatted}</Text>
        </View>
      );
    }

    return <View style={styles.errorBox} />;
  };

  showFieldError = (field) => {
    if (!this.fieldHasError(field)) {
      return null;
    }
    return (
      <Item style={styles.errorText}>
        <Text style={styles.errorMessage}>{this.state.errors[field]}</Text>
      </Item>
    );
  };

  showSpinner = () => {
    if (!this.props.isRegisteringUser) {
      return null;
    }
    return <Spinner color="#f58220" />;
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content keyboardShouldPersistTaps="always">
          <Form style={styles.card}>
            {this.firstNameInput()}
            {this.showFieldError('firstName')}
            {this.lastNameInput()}
            {this.showFieldError('lastName')}
            {this.emailInput()}
            {this.showFieldError('email')}
            {this.phoneNumberInput()}
            {this.showFieldError('phoneNumber')}
            {this.passwordInput()}
            {this.showFieldError('password')}
            {this.showNonFieldError()}
            {this.registerbutton()}
            {this.showSpinner()}
          </Form>
        </Content>
      </Container>
    );
  }

  onRegisterPress = () => {
    if (!this.canSubmitForm()) {
      Toast.show({
        text: 'Noen av feltene er ikke fylt ut riktig',
        position: 'bottom',
        buttonText: 'OK',
        duration: 1500,
      });
      return;
    }

    this.props.onRegisterPress(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.phoneNumber,
      this.state.password
    );
  };

  registerbutton() {
    const isDisabled = this.state.touched.size === 0 || this.props.isRegisteringUser || !this.canSubmitForm();

    return (
      <Button full disabled={isDisabled} onPress={this.onRegisterPress} style={styles.registerButton}>
        <Text>Registrer meg</Text>
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: 320,
    fontSize: 20,
    height: 52,
  },
  registerButton: {
    marginBottom: 16,
  },
  errorBox: {
    marginVertical: 10,
  },
  errorMessage: {
    textAlign: 'center',
    color: theme.colors.danger,
    fontSize: 14,
  },
  card: theme.card,
  errorText: {
    paddingTop: 2,
    paddingBottom: 12,
  },
});
