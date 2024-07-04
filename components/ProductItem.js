import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart, decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    item.quantity = item.minQty;
  };
  const increaseQuantity = (item) => {
    item.quantity += item.minQty;
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    if (item.quantity === item.minQty) {
      deleteItem(item);
      setAddedToCart(false);
    } else {
      item.quantity -= item.minQty;
      dispatch(decrementQuantity(item));
    }
  };

  const deleteItem = (item) => {
    setAddedToCart(false);
    dispatch(removeFromCart(item));
  };

  // useEffect(() => {
  //   if (item.quantity == 0) {
  //     setAddedToCart(false)
  //   }
  // }, [item.quantity])

  return (
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

        <View>
          <Text
            style={{
              // width: 83,
              fontSize: 17,
              fontWeight: "500",
              marginBottom: 7,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ color: "gray", fontSize: 15 }}>
            ₹{item.rate}/{item.unit}
          </Text>
          <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
            Minimum Quantity: {item?.minQty}
          </Text>
        </View>

        {
          item.quantity > 0 && (
            <View>
              <Text style={{
                  fontSize: 15,
                  color: "#088F8F",
                  fontWeight: "600",
                }}>
                You Pay : ₹{item.rate * item.quantity}
              </Text>
            </View>
          )
        }

        {item.quantity > 1 ? (
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
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
