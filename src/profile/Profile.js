import React from 'react';
import styles from '../../app.css';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFoundation from 'react-native-vector-icons/Foundation';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from 'react-redux';
import * as actionTypes from '../Redux/constants/cartConstants';

const Profile = () => {

    const userLogging = useDispatch()

    const [checkboxState, setCheckboxState] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [userinfo, setUserinfo] = useState([])

    const dispatch = useDispatch();

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem('TokenKey')

            if (value !== null) {
                userLogging({
                    type: actionTypes.USER_OUT,
                    payload: value,
                })
                callProfile();
                setIsLogged(true)

            }

            async function callProfile() {
                const AuthStr = 'Bearer '.concat(value)
                const response = await axios.get("https://cms.vendoo.ge/api/customer/data", {
                    headers: {
                        Authorization: AuthStr
                    }
                })
                setUserinfo(response.data)

            }
        } catch (e) {
            setError("you should logging in system again")
            setIsLogged(false)
        }
    }

    const Credentials = async () => {
        try {
            const response = await axios.post('https://cms.vendoo.ge/api/customer/login',
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        'accept': "application/json"
                    }
                }
            )
            const Token = response.data.token

            await saveToken(Token)

            setIsLogged(true)

        } catch (e) {
            setError(e.response.data.message)
        }
    }


    const saveToken = async (value) => {
        try {
            await AsyncStorage.setItem('TokenKey', value)
        } catch (e) {

        }
    }


    const Logout = async () => {
        await AsyncStorage.removeItem('TokenKey')
        setIsLogged(false)
        setUsername('')
        setPassword('')

        userLogging({
            type: actionTypes.USER_OUT,
            payload: "",
        })
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: {
                ProductName: null,
            }
        })

    }

    useEffect(async () => {
        await checkToken();

    }, [isLogged])

    return (
        <View>
            {isLogged ?
                <View style={styles.ProfileMainBody}>
                    <View style={styles.ProfileBody}>

                        <View style={styles.ProfileName}><Text style={styles.ProfileNameTXT}>მოგესალმებით, {userinfo.first_name}</Text></View>
                        <View style={[styles.ProfileLast, styles.ProfileInfo]}>
                            <Icon name="user-circle-o" size={30} color={"black"} style={styles.profileUserIcon} />
                            <Text style={styles.ProfileTXT}>გვარი : {userinfo.last_name}</Text>
                        </View>

                        <View style={[styles.ProfileEmail, styles.ProfileInfo]}>
                            <IconFoundation name="mail" size={30} color={"black"} style={styles.profileUserIcon} />
                            <Text style={styles.ProfileTXT}>ელ-ფოსტა : {userinfo.email}</Text>
                        </View>

                        <View style={[styles.ProfilePhone, styles.ProfileInfo]}>
                            <Icon name="phone-square" size={30} color={"black"} style={styles.profileUserIcon} />
                            <Text style={styles.ProfileTXT}>მობილური : {userinfo.phone}</Text>
                        </View>

                    </View>
                    <TouchableOpacity
                        style={styles.loginBTN}
                        onPress={Logout}
                    >
                        <Text style={styles.btnTXT}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.loginInfo}>
                    <Text style={styles.errorTXT}>{error}</Text>
                    <Text style={styles.loginTXT}>Access to your account : </Text>
                    <View style={styles.usernameBorder}>
                        <TextInput
                            style={styles.input}
                            placeholder="username"
                            onChangeText={username => setUsername(username)}
                        />
                    </View>
                    <View style={styles.usernameBorder}>
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            onChangeText={password => setPassword(password)}
                            secureTextEntry={checkboxState ? false : true}
                        />
                    </View>
                    <BouncyCheckbox
                        textStyle={{
                            textDecorationLine: "none",
                        }}
                        style={styles.checkBox}
                        isChecked={checkboxState}
                        text="Show password"
                        onPress={() => setCheckboxState(!checkboxState)}
                    />
                    <TouchableOpacity
                        style={styles.loginBTN}
                        onPress={Credentials}
                    >
                        <Text style={styles.btnTXT}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}


export default Profile; 