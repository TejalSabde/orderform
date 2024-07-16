import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setOrdersInReducer } from "../redux/orderReducer";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0)
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const walletBal = await AsyncStorage.getItem('walletBalance')
      setWalletBalance(walletBal)
      try {
        const response = await axios.get(
          `http://13.233.20.152/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  const navigateToRefund = () => {
    navigation.navigate('refund');
  }

  const logout = () => {
    clearAuthToken();
  };
  const showAlert = () => {
    navigation.navigate('downloadInvoice');
  }
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://13.233.20.152/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);
        dispatch(setOrdersInReducer(orders))
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#000000",
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 22 }}>Shawarmaji</Text>

      </View>

      <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 10, marginTop: 10 }}>
        Welcome ,
      </Text>
      <Text style={{ fontSize: 16, fontWeight: 400, marginHorizontal: 10 }}>
        Your wallet balance is : ₹{walletBalance}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
          paddingHorizontal: 10,
          paddingTop: 10
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#f3b318",
            borderRadius: 4,
            flex: 1,
          }}
          onPress={navigateToRefund}
        >
          <Text style={{ textAlign: "center" }}>Raise A Refund</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#f3b318",
            borderRadius: 4,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Check refund status</Text>
        </Pressable>

      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
          paddingHorizontal: 10,
          paddingTop: 10
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#f3b318",
            borderRadius: 4,
            flex: 1,
          }}
          onPress={showAlert}
        >
          <Text style={{ textAlign: "center" }}>Download past Invoice</Text>
        </Pressable>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#f3b318",
            borderRadius: 4,
            flex: 1,
          }}
          onPress={logout}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          <>
            <View style={{ paddingVertical: 5, flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
              <Text style={{ color: 'gray' }}>Orders from last 15 days</Text>
            </View>
            {orders.map((order) => (
              <Pressable
                style={{
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  marginHorizontal: 10,
                }}
                key={order._id}
              >
                <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 20 }}>
                  <View>
                    <View style={{ paddingVertical: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}> Order No:</Text>
                      <Text style={{ fontSize: 16, fontWeight: "bold", color: '#088F8F' }}> #{order._id}</Text>
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}> Payment Type:</Text>
                      <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000000' }}> {order.paymentMethod}</Text>
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}> Subtotal:</Text>
                      <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000000' }}> {order.totalPrice}</Text>
                    </View>
                    <View style={{ paddingVertical: 5 }}>
                      <Text style={{ fontSize: 16, color: 'gray' }}> Created Date:</Text>
                      <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000000' }}> {moment(order.createdAt).format('Do MMMM YYYY, h:mma')}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image style={{ width: 70, height: 70 }}
                      source={require('../assets/paid.png')} />
                  </View>
                </View>
                <View style={{ borderTopColor: 'lightgray', borderTopWidth: 1 }}>
                  {order.products.map((product) => (
                    <View style={{
                      backgroundColor: "#F8F8F8",
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 5,
                      padding: 10
                    }} key={product._id}>
                      <View>
                        <Text
                          style={{
                            // width: 83,
                            fontSize: 16,
                            fontWeight: "500",
                            marginBottom: 7,
                          }}
                        >
                          {product.name}
                        </Text>
                        <Text style={{ color: "gray", fontSize: 14 }}>
                          Quantity Ordered: {product.quantity}
                        </Text>
                      </View>
                      <View >
                        <Text
                          style={{
                            marginVertical: 10,
                            color: "green",
                            textAlign: "center",
                            padding: 5,
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          You Paid : {product.rate * product.quantity}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <Pressable style={{ backgroundColor: "#f3b318", borderRadius: 4 }}>
                  <Text
                    style={{
                      borderColor: "gray",
                      borderRadius: 4,
                      marginVertical: 10,
                      color: "#000000",
                      textAlign: "center",
                      padding: 5,
                      fontSize: 17,
                      fontWeight: 600,
                    }}
                  >
                    Download Invoice
                  </Text>
                </Pressable>
              </Pressable>
            ))}
          </>

        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
