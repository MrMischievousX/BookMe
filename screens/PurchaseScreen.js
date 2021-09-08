import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Text } from 'react-native';
import PurchaseBook from '../components/Home/PurchaseBook';
import { useSelector } from 'react-redux';
import { Icon, Header } from "react-native-elements"
import BottomSheet from 'reanimated-bottom-sheet';
import axios from "axios"

const windowWidth = Dimensions.get('window').width;

export default function PurchaseScreen({ navigation }) {
  const { purchaseList } = useSelector((state) => state);

  const sheetRef = useRef(null);
  const [price, setprice] = useState(0)
  const [send, setSend] = useState('null')
  const [error, seterror] = useState(false)

  const purchaseBooks = () => {
    setSend('true')
    let PostMessage = {
      name: "akash",
      total: price,
      books: []
    }
    purchaseList.map((item) => {
      PostMessage.books.push({ id: item.id, title: item.title })
    })

    axios.post('https://api.tago.care/assignment/', PostMessage)
      .then((response) => {
        console.log(response);
        setSend("false")
        setTimeout(() => {
          setSend('null')
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        seterror(true)
        setSend("false")
        setTimeout(() => {
          setSend('null')
        }, 2000);
      });
  }

  useEffect(() => {
    if (purchaseList.length >= 1) {
      let temp = 0;
      purchaseList.map((item) => {
        temp += item.price
      })
      setprice(temp)
    }
  }, [purchaseList])

  const renderContent = () => {
    if (send === 'null') {
      return <View
        style={{
          backgroundColor: '#D9D8D8',
          paddingVertical: 30,
          paddingHorizontal: 30,
          height: 220,
        }}
      >
        <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
          <Text style={[styles.book, { width: 150 }]}>No. of Books:</Text>
          <Text style={styles.book}>{purchaseList.length}</Text>
        </View>
        <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
          <Text style={[styles.book, { width: 150 }]}>Total Price: </Text>
          <Text style={styles.book}>{price}</Text>
        </View>
        <TouchableOpacity
          onPress={purchaseBooks}
          activeOpacity={0.8}
        >
          <View style={styles.cartContainer}>
            <Text style={styles.cartText}>
              Buy now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    }
    else if (send == 'true') {
      return <View
        style={{
          backgroundColor: '#D9D8D8',
          paddingVertical: 30,
          paddingHorizontal: 30,
          height: 220,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size={50} color="black" />
        <Text style={[styles.book, { marginTop: 10 }]}>Booking</Text>
      </View>
    }
    else if (send === 'false') {
      return <View
        style={{
          backgroundColor: '#D9D8D8',
          paddingVertical: 30,
          paddingHorizontal: 30,
          height: 220,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={[styles.book, { fontSize: 28, textAlign: "center", width: 250 }]}>{!error ? 'Book Purchased Successfully' : "Failed to Purchase Books"}</Text>
      </View>
    }
  }

  if (purchaseList.length < 1)
    return <ScrollView style={{ paddingHorizontal: 15, backgroundColor: "white" }}>
      <Header
        backgroundColor="transparent"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.cart}>Shopping Cart</Text>
      </View>
      <View>
        <Text style={styles.empty}>Your Shopping Cart is Empty.</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderScreen")}
          activeOpacity={0.8}
        >
          <View style={styles.cartContainer}>
            <Text style={styles.cartText}>
              Buy now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>


  return (
    <>
      <ScrollView style={{ paddingHorizontal: 15, backgroundColor: "white" }}>
        <Header
          backgroundColor="transparent"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cart}>Shopping Cart</Text>
          <Icon name='shopping-bag'
            color="orange"
            type="font-awesome"
            onPress={() => sheetRef.current.snapTo(2)}
            containerStyle={{ marginLeft: 8 }}
            iconStyle={styles.backButton} />
        </View>
        <View>
          <Text style={styles.amount}>Amount</Text>
        </View>
        <View style={styles.bookList}>
          {purchaseList.map((item, index) => {
            return <PurchaseBook
              index={index}
              id={item.id}
              title={item.title}
              price={item.price}
              key={item.id}
              imageLinks={item.imageLinks}
            />
          })}
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[220, 0]}
        borderRadius={20}
        initialSnap={1}
        renderContent={renderContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 30,
    textAlign: "right",
    fontFamily: "sans-serif"
  },
  empty: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 30,
    textAlign: "left",
    fontFamily: "sans-serif"
  },
  cartContainer: {
    width: windowWidth * 0.9,
    height: 70,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
  },
  cartText: {
    color: "white",
    fontSize: 20,
    fontFamily: "sans-serif"
  },
  backButton: {
    fontSize: 45,
    padding: 5,
    fontWeight: "700"
  },
  cart: {
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "sans-serif"
  },
  book: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  bookList: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  }
})
