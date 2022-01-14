import * as actionTypes from '../Redux/constants/cartConstants';
import React from 'react'
import { Text, View, ActivityIndicator, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from "react"
import axios from 'axios';
import styles from '../../app.css'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function ProdDetails({ route }) {


    const [logged, setLogged] = useState(true)
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [error, setError] = useState('')
    const [price, setPrice] = useState('')
    const [photo, setPhoto] = useState('')
    const [desc, setDesc] = useState('')
    const [guitarName, setGuiterName] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    async function ProductDetails() {
        try {
            const response = await axios.get(`https://cms.vendoo.ge/api/page/type`, {
                params: {
                    url: route.params.id
                },
                headers: {
                    "accept": "application/json"
                }
            })
            setPhoto(() => response.data.image)
            setDesc(() => response.data.description)
            setPrice(() => response.data.product_price_amount)
            setGuiterName(() => response.data.meta_title)
            setIsLoading(false)
        } catch (e) {
            setError(e)
        }

    }

    useEffect(async () => {
        ProductDetails();
        try {
            const usersToken = await AsyncStorage.getItem('TokenKey');
            if (usersToken === null) {
                setLogged(false)
            } else {
                setLogged(true)
                setError('')
            }
        } catch (e) {
            console.log(e)
        }
    }, [isFocused])


    const addProduct = () => {
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                imageURL: photo,
                productPrice: price,
                ProductName: guitarName,
                quantity: 1,
            }
        })

        navigation.navigate('Your Cart Items')
    }


    return (

        <View style={styles.MainBody}>
            <Text style={styles.error}>{error}</Text>
            {isLoading ?
                <ActivityIndicator size="large" /> :
                <ScrollView>
                    <View style={styles.infoProdBox}><View style={styles.infoProdBoxChild}><Text style={styles.infoProdName}>{guitarName}</Text></View></View>
                    <View style={styles.infoIMG}>
                        <Image
                            style={styles.infoPhoto}
                            source={{
                                uri: photo
                            }}
                        />
                        <Text style={styles.infoDesc}>{desc}</Text>
                    </View>
                    <View style={styles.bottomPart}>
                        <Text style={styles.infoPrice}>Price : {price} GEL</Text>
                        <TouchableOpacity style={styles.ActiveprodBTN}
                            onPress={() => logged ? addProduct() : alert('You must be authorized to buy this product.')}>
                            <Text style={styles.prodBtnTxt}>Add to cart</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            }
        </View>

    )
}
