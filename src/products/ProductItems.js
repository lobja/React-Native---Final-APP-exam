import React from 'react'
import { Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../app.css'

const ProductItems = ({ gname, gimage, gprice, gurl }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.prodFrame} onPress={() => navigation.navigate('ProductDetails', { id : gurl})}>
            <ImageBackground source={{ uri: gimage }} style={styles.prodIMG} />
            <Text style={styles.prodNameTXT}>{gname}</Text>
            <Text style={styles.gpriceTXT}>{gprice} GEL</Text>
        </TouchableOpacity>
    );
}

export default ProductItems;