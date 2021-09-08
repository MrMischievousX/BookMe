import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { Header, Icon, Image, Text } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { asyncPurchaseList } from '../reduxConfig/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BookDetailScreen({ navigation, route }) {
    const { itemData, itemSaleData, id } = route.params
    const { title, authors, averageRating, description, imageLinks, language, pageCount } = itemData
    const { listPrice } = itemSaleData

    const { purchaseList } = useSelector((state) => state);
    const dispatch = useDispatch();

    const addToPurchaseList = () => {
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

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={{ flex: 1 }}>
                <Header
                    backgroundColor="transparent"
                    leftComponent={<Icon name='angle-left'
                        color="#598fa0"
                        type="font-awesome"
                        onPress={() => navigation.goBack()}
                        containerStyle={{ marginLeft: 8 }}
                        iconStyle={styles.backButton} />}
                />
                <View style={styles.conatiner}>
                    <Image
                        source={{ uri: imageLinks.thumbnail }}
                        style={{
                            width: windowWidth / 1.5,
                            height: windowHeight / 2.5,
                            resizeMode: 'contain',
                            borderBottomRightRadius: 2,
                            borderTopRightRadius: 2,
                        }}
                    />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>
                        {`Rs ${listPrice ? listPrice.amount : pageCount}`}
                    </Text>
                    <View style={styles.rateContainer}>
                        <FontAwesome
                            style={{ marginRight: 5 }}
                            name={
                                averageRating >= 1 ? "star" : averageRating === 0 ? "star-o" : "star-half-full"
                            }
                            size={32}
                            color="red"
                        />
                        <FontAwesome
                            style={{ marginRight: 5 }}
                            name={
                                averageRating >= 2
                                    ? "star"
                                    : averageRating <= 1.5 && averageRating < 2
                                        ? "star-o"
                                        : "star-half-full"
                            }
                            size={32}
                            color="red"
                        />
                        <FontAwesome
                            style={{ marginRight: 5 }}
                            name={
                                averageRating >= 3
                                    ? "star"
                                    : averageRating <= 2.5 && averageRating < 3
                                        ? "star-o"
                                        : "star-half-full"
                            }
                            size={32}
                            color="red"
                        />
                        <FontAwesome
                            style={{ marginRight: 5 }}
                            name={
                                averageRating >= 4
                                    ? "star"
                                    : averageRating <= 4.5 && averageRating < 4
                                        ? "star-o"
                                        : "star-half-full"
                            }
                            size={32}
                            color="red"
                        />
                        <FontAwesome
                            style={{ marginRight: 5 }}
                            name={
                                averageRating >= 5
                                    ? "star"
                                    : averageRating <= 4.5 && averageRating < 5
                                        ? "star-o"
                                        : "star-half-full"
                            }
                            size={32}
                            color="red"
                        />
                    </View>
                    <Text style={styles.author}>
                        Author : {authors}
                    </Text>
                    <Text style={styles.language}>
                        Lanuage : {language.toUpperCase()}
                    </Text>
                    <Text style={styles.desc}>
                        {description}
                    </Text>
                    <TouchableOpacity
                        onPress={addToPurchaseList}
                        activeOpacity={0.8}
                    >
                        <View style={styles.cartContainer}>
                            <Text style={styles.cartText}>
                                Add To Cart
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    backButton: {
        fontSize: 45,
        padding: 5,
        fontWeight: "700"
    },
    rateContainer: {
        marginTop: 10,
        flexDirection: "row"
    },
    conatiner: {
        flex: 1,
        alignItems: "center",
        paddingBottom: 30
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginTop: 10,
        fontWeight: "900",
        letterSpacing: 0.2,
        paddingTop: 20,
        paddingHorizontal: 50,
    },
    author: {
        fontSize: 18,
        marginTop: 15,
        letterSpacing: 0.2,
        paddingHorizontal: 25,
        color: "grey",
        alignSelf: "flex-start"
    },
    language: {
        fontSize: 18,
        letterSpacing: 0.2,
        paddingHorizontal: 25,
        color: "grey",
        alignSelf: "flex-start"
    },
    desc: {
        fontSize: 18,
        letterSpacing: 0.2,
        paddingHorizontal: 25,
        color: "grey",
        opacity: 0.8,
        alignSelf: "flex-start"
    },
    price: {
        fontSize: 26,
        textAlign: "center",
        marginTop: 2,
        color: "grey",
        opacity: 0.8,
        letterSpacing: 1
    },
    cartContainer: {
        width: windowWidth * 0.9,
        height: 70,
        borderRadius: 20,
        marginTop: 15,
        backgroundColor: "#262626",
        justifyContent: "center",
        alignItems: "center",
    },
    cartText: {
        color: "white",
        fontSize: 20,
        fontFamily: "sans-serif"
    }
})