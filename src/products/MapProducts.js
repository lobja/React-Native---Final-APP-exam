import React from 'react'
import { Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../app.css'
import ProductItems from './ProductItems';
import axios from 'axios';


function MapProducts() {

    const [guitar, setGuitar] = useState([])
    const [ logMessage, setLogMessage ] = useState('')
    

    const CallProducts = async () => {
        try {
            const response = await axios.get('https://cms.vendoo.ge/api/beta/catalog?url=musikaluri-instrumentebi%2Fgitara%2Fakustikuri-gitara')
            setGuitar(() => response.data.products)
        } catch (e) {
            setLogMessage(e) 
        }
    }

    useEffect(() => {
        CallProducts();
    }, [])

    return (
        <ScrollView>
            <View><Text>{logMessage}</Text></View>
            <View>
                <View style={styles.prodBody}>
                    {guitar.map((prod, index) =>
                        <ProductItems
                            key={index}
                            gname={prod.name}
                            gimage={prod.thumb_img.files.file}
                            gprice={prod.final_price}
                            gurl={prod.url}
                        />
                    )} 
                </View>
            </View>
        </ScrollView>
    )
}

export default MapProducts;