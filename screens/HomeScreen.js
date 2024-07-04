import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const list = [
    {
      id: 0,
      image: require('../assets/all.png'),
      name: "All",
    },
    {
      id: 1,
      image: require('../assets/sauces.png'),
      name: "Sauces",
    },
    {
      id: 2,
      image: require('../assets/package.png'),
      name: "Packaging",
    },
    {
      id: 3,
      image: require('../assets/premix.png'),
      name: "Premix",
    },
    {
      id: 4,
      image: require('../assets/misc.png'),
      name: "Miscellaneous",
    }
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [category, setCategory] = useState(0);
  const { userId, setUserId} = useContext(UserType);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [searchProduct, setsearchProduct] = useState("");

  useEffect(() => {
    const checkCartChanges = () => {
      if (cart.length === 0) {
        const updatedProducts = products.map((item) => ({
          ...item,
          quantity: 0,
        }));
        setProducts(updatedProducts);
      } else {
        const updatedProducts = products.map((item) => {
          const cartItem = cart.find((cartItem) => cartItem.name === item.name);
          if (cartItem) {
            return { ...item, quantity: cartItem.quantity };
          } else {
            return { ...item, quantity: 0 };
          }
        });
        setProducts(updatedProducts);
      }
    };
    checkCartChanges()
  }, [cart])


  useEffect(() => {
    const fetchData = async () => {
      const outlet = await AsyncStorage.getItem("outlet");
      setSelectedOutlet(outlet)
      axios.get("http://192.168.1.9:9000/products")
        .then((response) => {

          setProducts(response.data.products)
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "Not able to fetch product list");
        });
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  return (
    <>
      <SafeAreaView
        style={{
          // marginTop: 30,
          paddinTop: 60,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          {/* search bar */}
          <View
            style={{
              backgroundColor: "#000000",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search products" value={searchProduct} onChangeText={(text) => setsearchProduct(text)} />
            </Pressable>

            <Feather name="mic" size={24} color="black" />
          </View>

          {/* deliver to address */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#f3b318",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <Text>
              Deliver to {selectedOutlet} Shawarmaji Outlet
            </Text>

          </Pressable>

          {/* categories shown */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                onPress={() => setCategory(item.id)}
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: category === item.id ? 2 : 0,
                  borderColor: '#f3b318',
                  borderRadius: 25,
                  padding: 10
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={item.image}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Product list */}
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          > */}
            {
              searchProduct == "" ?
                (products
                  ?.filter((item) => category != 0 ? item.categoryId === category : item)
                  .map((item, index) => (
                    <ProductItem item={item} key={index} />
                  )))
                :
                (products
                  ?.filter((item) => item.name.toLowerCase().includes(searchProduct.toLowerCase()))
                  .map((item, index) => (
                    <ProductItem item={item} key={index} />
                  )))

            }



          {/* </View> */}

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
