import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Dimensions } from 'react-native';
import { asyncPurchaseList } from '../../reduxConfig/actions';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

export default function PurchaseBook({ id, title, price, imageLinks }) {

    const { purchaseList } = useSelector((state) => state);
    const dispatch = useDispatch();

    const removeFromPurchaseList = () => {
        const temp = purchaseList.filter((item) => {
            return item.id != id
        })
        dispatch(asyncPurchaseList([...temp]))
    }

    return (
        <>
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
                    <FontAwesome
                        onPress={removeFromPurchaseList}
                        style={styles.delete}
                        name="trash"
                        size={28}
                        color='black'
                    />
                </View>
                <View style={styles.addContainer}>
                    <Text style={styles.add} >
                        {`Rs ${parseInt(price)}`}
                    </Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    desc: {
        fontFamily: "sans-serif",
    },
    delete: {
        paddingTop: 10,
        paddingLeft: 5,
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
        width: '50%',
        paddingLeft: 10
    },
    title: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 1
    },
    addContainer: {
        width: '20%',
    },
    add: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        textAlign: "right",
        fontSize: 18,
        letterSpacing: 0.5,
        color: "grey"
    },
})
