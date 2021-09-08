import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { asyncPurchaseList } from '../../reduxConfig/actions';
import { useDispatch, useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

export default function Book({ itemData, itemSaleData, id, navigation }) {
    const { publishedDate, title, authors, averageRating, description, imageLinks, language, pageCount } = itemData
    const { listPrice } = itemSaleData

    const [change, setchange] = useState(false)

    const { purchaseList } = useSelector((state) => state);
    const dispatch = useDispatch();

    const addToPurchaseList = () => {
        setchange(true)
        const price = listPrice ? parseInt(listPrice.amount) : pageCount;
        if (purchaseList.length < 1)
            dispatch(asyncPurchaseList([...purchaseList, { id, title, price, imageLinks }]))
        else {
            const temp = purchaseList.filter((item) => {
                return item.id != id
            })
            dispatch(asyncPurchaseList([...temp, { id, title, price, imageLinks }]))
        }
    }


    if (!(publishedDate && title && authors && averageRating && description && imageLinks && language && pageCount))
        return null

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("BookDetails", {
                itemData, itemSaleData, id
            })}
        >
            <View style={styles.Book}>
                <View style={styles.image}>
                    <Image
                        source={{ uri: imageLinks.thumbnail.slice(0, 4) + 's' + imageLinks.thumbnail.slice(4) }}
                        style={{
                            width: '100%',
                            height: 180,
                            resizeMode: 'stretch'
                        }}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>
                        {`Rs ${listPrice ? parseInt(listPrice.amount) : pageCount}`}
                    </Text>
                </View>
                <View style={styles.addContainer}>
                    <Text style={[styles.add, { color: change ? 'orange' : 'black' }]} onPress={addToPurchaseList}>+</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    desc: {
        fontFamily: "sans-serif",
    },
    price: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        marginTop: 5,
        color: "grey",
        fontSize: 17,
        letterSpacing: 0.5
    },
    Book: {
        flexDirection: 'row',
        marginTop: 10,
        width: windowWidth - 40,
        height: 200,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    image: {
        width: '30%',
        alignItems: "flex-start",
        overflow: "hidden",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    titleContainer: {
        width: '55%',
    },
    title: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 1
    },
    addContainer: {
        width: '8%',
        alignItems: "flex-start"
    },
    add: {
        fontFamily: "sans-serif",
        fontWeight: "700",
        fontSize: 50,
        letterSpacing: 1,
        alignSelf: "flex-start"
    },
})
