import React, { useEffect, } from 'react';
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import axios from 'axios'
import Book from '../components/Home/Book';
import { useSelector, useDispatch } from 'react-redux';
import { asyncBookList, asyncSignOut } from '../reduxConfig/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Header } from "react-native-elements"

export default function OrderScreen({ navigation }) {
  const { bookList, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getBooks = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=30').then((result) =>
      setTimeout(() => {
        dispatch(asyncBookList(result.data.items))
      }, 2000)
    )
  }

  const signOut = async () => {
    console.log("Logged Out")
    try {
      await GoogleSignin.signOut();
      dispatch(asyncSignOut());
      navigation.navigate("Login")
    } catch (error) {
      dispatch(asyncSignOut());
      navigation.navigate("Login")
    }
  };

  useEffect(() => {
    if (!bookList)
      getBooks();
  }, [])

  if (!(bookList && user))
    return <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      <Header
        backgroundColor="transparent"
      />
      <Image
        source={require('../assets/book.gif')}
        style={{ width: 400, height: 400 }}
      />
      <Text style={styles.load}> Loading Books </Text>
    </View>

  return (
    <ScrollView style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
      <Header
        backgroundColor="transparent"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.name}>Hi, {user.name}!</Text>
        <FontAwesome
          name="sign-out"
          size={34}
          color='orange'
          onPress={signOut}
        />
      </View>
      <View>
        <Text style={styles.list}>List</Text>
      </View>
      <View style={styles.bookList}>
        {bookList.map((item, index) => {
          return <Book
            navigation={navigation}
            itemData={item.volumeInfo}
            itemSaleData={item.saleInfo}
            key={item.id}
            id={item.id}
          />
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 1,
    fontFamily: "sans-serif"
  },
  list: {
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 10,
    fontFamily: "sans-serif"
  },
  bookList: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  load: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 1,
    fontFamily: "sans-serif"
  }
})
