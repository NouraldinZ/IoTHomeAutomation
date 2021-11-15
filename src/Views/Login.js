import React, {Component} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {LineChart, Path} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as theme from '../Theme/theme';
import {Block, Text} from '../Components';
import mocks from '../Theme/settings';
import firebase from "../firebase";
import {sha256} from "js-sha256";

class Login extends Component {
    state = {
        username: '',
        password: '',
    };
    static navigationOptions = {
        header: null,
    };
    login = () => {
        const {navigation, settings, lights} = this.props;

        const usernameEntered = this.state.username;
        const passwordHash = sha256(this.state.password);
        //console.log(usernameEntered, passwordHash);
        const usersRef = firebase.database().ref("Users");
        let userFound = false;
        usersRef.on('value', (snapshot) => {
            const users = snapshot.val();
            for(let i in users){
                //console.log(users[i]);
                if(users[i].username == usernameEntered && users[i].password == passwordHash){
                    userFound = true;
                    break;
                }
            }
        });
        if(userFound) {
            console.log("LOGIN SUCCESSFUL -", usernameEntered);
            navigation.navigate('Dashboard', {username:usernameEntered});
            this.usrInput.clear();
            this.setState({
                username:'',
            });
        } else {
            console.log("LOGIN FAILED!");
        }

        this.pwdInput.clear();
        this.setState({
            password:'',
        });
        console.log(this.state.password);

    };

    updateLoginUsername = (u) => {
        this.setState({username: u});
    }

    updateLoginPassword = (p) => {
        this.setState({password: p});
    }

    render() {

        return (
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

                        </Block>
                        <Block
                            row
                            space="around"
                            style={{marginVertical: theme.sizes.base, paddingTop: 50}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.login}>
                                <Block center middle style={styles.button}>
                                    <Text button style={{marginTop: theme.sizes.base * 0.5}}>
                                        LOGIN
                                    </Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
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
        backgroundColor: '#ffe5ba',
        alignContent:"center",
    },
    buttons: {
        flex: 1,
        marginBottom: -theme.sizes.base * 6,
    },
    button: {
        backgroundColor: theme.colors.button,
        width: 151,
        height: 151,
        borderRadius: 151 / 2,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
