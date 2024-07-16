import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { UserType } from "../UserContext";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const { userId, setUserId } = useContext(UserType);
  const total = cart
    ?.map((item) => item.rate * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();

  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        currency: "INR",
        name: "Shawarmaji",
        key: "rzp_test_PICNbgkFbDBs8N",
        amount: 1000,//total * 100,
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "RazorPay Software",
        },
        theme: { color: "#F37254" },
      };

      const data = await RazorpayCheckout.open(options);

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        paymentMethod: "card",
      };
      const response = await axios.post(
        "http://13.233.20.152/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
        <Text style={{color:"#FFFFFF",fontSize:22}}>Shawarmaji</Text>

      </View>

      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{total}</Text>
        </View>
      {/* <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text> */}

      <Pressable
        disabled={cart.length == 0}
        onPress={() => pay()}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>

      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View>
            <Pressable
              style={{
                backgroundColor: "#F8F8F8",
                borderRadius: 8,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 14,
              }}
            >
              {/* <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: item.image }}
          />
        </View> */}

              <View>
                <Text
                  style={{
                    // width: 83,
                    fontSize: 17,
                    fontWeight: "500",
                    marginBottom: 7,
                  }}
                >
                  {item?.name}
                </Text>
                <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 ,paddingRight:20}}>
                  ₹{item?.rate * item?.quantity}
                </Text>
                <Text style={{ fontWeight: "500", marginTop: 6 ,color: "gray", fontSize: 15 }}>
                  Unit: {item?.unit}
                </Text>
                </View>
              </View>

             

              {item?.quantity > 1 ? (
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                >
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: "#BEBEBE",
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#088F8F",
                        paddingHorizontal: 8,
                        fontWeight: "600",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: "#BEBEBE",
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>
              ) : (
                <Pressable onPress={() => addItemToCart(item)} style={{ width: 80 }}>
                  <Text
                    style={{
                      borderColor: "gray",
                      borderRadius: 4,
                      borderWidth: 0.8,
                      marginVertical: 10,
                      color: "#088F8F",
                      textAlign: "center",
                      padding: 5,
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    Add
                  </Text>
                </Pressable>
              )}
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
