import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Cart from './cart/Cart';
import Products from './products/Products';
import Profile from './profile/Profile';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

    const isFocused = useIsFocused();

    const Tab = createBottomTabNavigator();

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    const [cartCount, setCartCount] = useState(0)

    //const [tabBarShow, setTabBarShow] = useState(false)



    useEffect(() => {
        let count = 0;
       

        pullStorageInfo();
        async function pullStorageInfo() {
            try {
                const usersToken = await AsyncStorage.getItem('TokenKey');
                if (usersToken === null) {
                    setCartCount(0)
                } else {
                    cartItems.forEach(element => {
                        count += element.quantity;
                    });
            
                    setCartCount(count)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }, [isFocused, cartItems, cartCount])

    // if (isFocused === true) {
    //     callToken();
    //     async function callToken() {
    //         const value = await AsyncStorage.getItem('TokenKey')
    //         if (value === null) {
    //             setTabBarShow(()=>false)
    //         } else {
    //             setTabBarShow(()=>true)
    //         }
    //     }
    // }


    return (

        <Tab.Navigator
            initialRouteName="Products"
            screenOptions={{
                tabBarActiveTintColor: '#fcd463',
                tabBarInactiveTintColor: "white",
                tabBarStyle: { backgroundColor: '#242829' },
            }}

        >
            <Tab.Screen
                name="Your Cart Items"
                component={Cart}
                options={{
                    headerStyle: {
                        backgroundColor: '#242829',
                    },
                    headerTintColor: '#fcd463',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarLabel: 'Your Cart',
                    tabBarBadge: cartCount,

                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Products"
                component={Products}
                options={{
                    headerStyle: {
                        backgroundColor: '#242829',
                    },
                    headerTintColor: '#fcd463',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    independent: true,
                    headerShown: false,
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shopping" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Your Profile"
                component={Profile}
                options={{
                    headerStyle: {
                        backgroundColor: '#242829',
                    },
                    headerTintColor: '#fcd463',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
}


