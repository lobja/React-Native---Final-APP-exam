import React from 'react';
import MapProducts from './MapProducts';
import ProductDetails from './ProductDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Products = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MapProducts"
                component={MapProducts}
                options={{
                    title : "Products",
                    headerStyle: {
                        backgroundColor: '#242829',
                    },
                    headerTintColor: '#fcd463',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                    title : "Products Details",
                    headerStyle: {
                        backgroundColor: '#242829',
                    },
                    headerTintColor: '#fcd463',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} 
            />
        </Stack.Navigator>
    )
}

export default Products;