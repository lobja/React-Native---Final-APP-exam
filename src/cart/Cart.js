import React from 'react'
import { useState, useEffect } from "react"
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../app.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from './CartItem';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const Cart = () => {

    const isFocused = useIsFocused();



    // if (isFocused === true) {
    //         callToken();
    //         async function callToken() {
    //             const value = await AsyncStorage.getItem('TokenKey')
    //             if (value === null) {
    //                 setNotLogged(()=>true)
    //             } else{
    //                 setNotLogged(()=>false)
    //         }
    //     }
    // }

    const [NotLogged, setNotLogged] = useState(false)

    const navigation = useNavigation()


    const cart = useSelector(state => state.cart);

    const cartTotal = useDispatch();

    const { cartItems } = cart;

    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        let TotItems = 0;
        let TotPrice = 0;

        cartItems.forEach(element => {
            TotItems += element.quantity;
            TotPrice += element.quantity * element.productPrice;
        });

        pullStorageInfo();
        async function pullStorageInfo() {
            try {
                const usersToken = await AsyncStorage.getItem('TokenKey');
                if (usersToken === null) 
                {
                   
                    cartTotal({
                        type: "ADD_TOTALS",
                        TotalItems: 0,
                    })

                    setNotLogged(true) 
                } else {
                                                       

                    setTotalItems(TotItems);
                    setTotalPrice(TotPrice);

                    cartTotal({
                        type: "ADD_TOTALS",
                        TotalItems: TotItems,
                    })
                    setNotLogged(false)
                }
                
            } catch (e) {
                console.log(e)
            }
            
        }

    }, [isFocused, cartItems, totalItems, totalPrice, setTotalItems, setTotalPrice, cartTotal])


    return (
        <ScrollView>
            {NotLogged ?
                <View style={styles.messageBox}>
                    <Text style={styles.messageTXT}>Not authorized in application.</Text>
                    <TouchableOpacity style={[styles.ActiveprodBTN, styles.backButton]} onPress={() => navigation.navigate('Your Profile')}>
                        <Text style={styles.prodBtnTxt}>Login Page</Text>
                    </TouchableOpacity>
                </View>

                :
                <View>

                    {cartItems.length === 0 ? (
                        <View style={styles.messageBox}>
                            <Text style={styles.messageTXT}>
                                Your cart is empty.
                            </Text>
                            <TouchableOpacity style={[styles.ActiveprodBTN, styles.backButton]} onPress={() => navigation.navigate('Products')}>
                                <Text style={styles.prodBtnTxt}>Shopping Page</Text>
                            </TouchableOpacity>
                        </View>

                    ) :
                        <View style={styles.cartItemBody}>
                            {cartItems.map((item, index) => (
                                <CartItem key={index} item={item} />
                            ))}
                            <View style={styles.totalBody}>
                                <Text style={styles.totalSummary}>Cart Summary</Text>
                                <Text style={styles.totalItems}>TOTAL : ( {totalItems} items)</Text>
                                <Text style={styles.totalPrice}>GEL : {totalPrice}</Text>
                                <TouchableOpacity style={styles.ActiveprodBTN} >
                                    <Text style={styles.prodBtnTxt}>Checkout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                </View>
            }
        </ScrollView>
    )
}

export default Cart;
