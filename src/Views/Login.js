import React, {Component} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import {LineChart, Path} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as theme from '../Theme/theme';
import {Block, Text} from '../Components';
import mocks from '../Theme/settings';
import firebase from "../firebase";
import {sha256} from "js-sha256";
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-root-toast';


class Login extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        createAccount:false,
        loading: false,
    };
    static navigationOptions = {
        header: null,
    };
    login = () => {

        if (!this.state.loading) {
            this.setState({loading:true});
            const {navigation, settings, lights} = this.props;
            const usernameEntered = this.state.username;
            const passwordHash = sha256(this.state.password);
            //console.log(usernameEntered, passwordHash);
            const usersRef = firebase.database().ref("Users");
            let userFound = false;
            usersRef.on('value', (snapshot) => {
                const users = snapshot.val();
                for (let i in users) {
                    //console.log(users[i]);
                    if (users[i].username === usernameEntered && users[i].password === passwordHash) {
                        userFound = true;
                        break;
                    }
                }
                if (userFound) {
                    this.usrInput.clear();
                    this.setState({
                        username: '',
                    });
                    console.log("LOGIN SUCCESSFUL -", usernameEntered);
                    navigation.navigate('Dashboard', {username: usernameEntered});
                } else {
                    console.log("LOGIN FAILED!");
                    Toast.show('Incorrect Username or Password!', {
                        duration: Toast.durations.SHORT,
                    });
                }
                this.pwdInput.clear();
                this.setState({
                    password: '',
                });
            });
            this.setState({loading:false});
        }
    };

    createAccount = () => {
        if (!this.state.loading) {
            this.setState({loading: true});
            if (!this.state.createAccount) {
                this.setState({createAccount: true});
            } else if (this.state.createAccount && this.state.username.length >= 5
                && this.state.password.length >= 8 && this.state.confirmPassword.length >= 8) {
                //Firebase add new user
                const user = {
                    username: this.state.username,
                    password: sha256(this.state.password),
                };
                console.log("CREATED ACCOUNT:", user);
                firebase.database().ref("Users").push(user);
                this.setState({
                    //username: '',
                    password: '',
                    confirmPassword: '',
                    createAccount: false,
                });

                //this.usrInput.clear();
                this.pwdInput.clear();
                this.confirmPwdInput.clear();
            }
            this.setState({loading:false});
        }


    }

    updateLoginUsername = (u) => {
        this.setState({username: u});
    }

    updateLoginPassword = (p) => {
        this.setState({password: p});
    }
    updateConfirmPassword = (p) => {
        this.setState({confirmPassword: p});
    }

    render() {
        const {navigation, settings, lights} = this.props;
        return (
            <LinearGradient style={styles.background} colors={['#ffedc3', '#fdc294', '#408dff']} >
            <Block style={styles.dashboard}>
                <ScrollView
                    contentContainerStyle={styles.buttons}
                    showsVerticalScrollIndicator={false}>


                    <Block column space="between" style={{paddingTop: 75}}>
                        <Text h1 center size={40} height={80} weight="600" spacing={0.1}>
                            I O T
                        </Text>
                        <Block>
                            <Text style={{marginTop: theme.sizes.base * 0.5, paddingTop: 25}}>
                                Username:
                            </Text>
                            <TextInput
                                ref={input => { this.usrInput = input }}
                                style={styles.input}
                                placeholder={"Username"}
                                onChangeText={this.updateLoginUsername}
                            />
                            <Text style={{marginTop: theme.sizes.base * 0.5}}>
                                Password:
                            </Text>
                            <TextInput
                                ref={input => { this.pwdInput = input }}
                                style={styles.input}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={this.updateLoginPassword}
                            />
                            {this.state.createAccount && <Text style={{marginTop: theme.sizes.base * 0.5}}>
                                Confirm Password:
                            </Text>}
                            {this.state.createAccount && <TextInput
                                ref={input => { this.confirmPwdInput = input }}
                                style={styles.input}
                                placeholder={"Confirm Password"}
                                secureTextEntry={true}
                                onChangeText={this.updateConfirmPassword}
                            />}

                        </Block>
                        <Block
                            row
                            space="around"
                            style={{marginVertical: theme.sizes.base, paddingTop: 20}}>
                            <Block cloumn>
                            {this.state.createAccount
                            && this.state.password!= this.state.confirmPassword
                            && (this.state.password!='' || this.state.confirmPassword!='')
                            && <Text center style={{marginTop: theme.sizes.base * 2, color:'red'}}>
                                Password do not match!
                            </Text>}
                            {this.state.createAccount
                            && (this.state.username < 5 || this.state.password.length < 8)
                            && (this.state.username!='' || this.state.password!='')
                            && <Text center style={{marginTop: theme.sizes.base * 2, color:'red'}}>
                                Username has to be atleast 5 characters long and Passwords have to atleast 8 characters long!
                            </Text>}


                            {!this.state.createAccount &&<TouchableOpacity
                                disabled={this.state.loading}
                                activeOpacity={0.8}
                                onPress={this.login}>
                                <Block center middle style={styles.button}>
                                    <Text button>
                                        LOGIN
                                    </Text>
                                </Block>
                            </TouchableOpacity>}
                            <TouchableOpacity
                                disabled={this.state.loading}
                                activeOpacity={0.8}
                                onPress={this.createAccount}
                                >
                                <Text bold button center style={{marginTop: theme.sizes.base * 2}}>
                                    Create an Account
                                </Text>
                            </TouchableOpacity>
                            {this.state.createAccount &&<TouchableOpacity
                                activeOpacity={0.8}
                                disabled={this.state.loading}
                                onPress={()=>this.setState({createAccount:false})}>
                                <Block center >
                                    <Text button style={{marginTop: theme.sizes.base*2}}>
                                        Back to Login
                                    </Text>
                                </Block>
                            </TouchableOpacity>}
                            </Block>
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
            </LinearGradient>
        );
    }
}

Login.defaultProps = {
    settings: mocks,
};

export default Login;

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        padding: theme.sizes.base * 2,
        marginBottom: -theme.sizes.base * 6,
        //backgroundColor: '#ffe5ba',
        alignContent:"center",
    },
    buttons: {
        flex: 1,
        marginBottom: -theme.sizes.base * 6,
    },
    button: {
        backgroundColor: theme.colors.button,
        width: 125,
        height: 125,
        borderRadius: 125 / 2,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get('window').height,
    },
});
