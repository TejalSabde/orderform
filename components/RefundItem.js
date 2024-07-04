import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { decrementQuantity, incementQuantity } from "../redux/orderReducer";


const RefundItem = ({ item }) => {

    const dispatch = useDispatch();

    const increaseQuantity = (item) => {
        if (item.returnQuantity <= item.quantity) {
            dispatch(incementQuantity(item));
        }
        else
            Alert.alert("Cannot exeed than ordered quantity")
    };
    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item));
    };

    return (
        <View style={{
            backgroundColor: "#F8F8F8",
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 5,
            padding: 10
        }} key={item?._id}>
            <View>
                <Text
                    style={{
                        // width: 83,
                        fontSize: 16,
                        fontWeight: "500",
                        marginBottom: 7,
                    }}
                >
                    {item?.name}
                </Text>
                <Text style={{ color: "gray", fontSize: 14 }}>
                    Quantity Ordered: {item?.quantity}
                </Text>
            </View>


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
                        {item?.returnQuantity}
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
        </View>

    );
};

export default RefundItem;

const styles = StyleSheet.create({});
