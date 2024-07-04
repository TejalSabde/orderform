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
import React, { useCallback, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";

const ProfileScreen = () => {
    const { userId } = useContext(UserType);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [orderDates, setOrderDates] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.1.9:9000/allorders/${userId}`
                );
                setOrders(response.data.orders);
                const orderDateList = response.data.orders.map((item) => {
                    const date = moment(item.createdAt).format('Do MMMM YYYY, h:mmA')
                    return { label: date, value: item._id }
                })
                setOrderDates(orderDateList)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchAllOrders();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    backgroundColor: "#000000",
                    padding: 15,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Download Historical Invoices</Text>

            </View>

            <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 10, marginTop: 10 }}>
                Select Order Date
            </Text>

            <View
                style={{
                    marginHorizontal: 10,
                    marginTop: 20,
                    marginBottom: 15,
                    zIndex: 1000,
                }}
            >
                <DropDownPicker
                    style={{
                        borderColor: "#B7B7B7",
                        height: 30,
                        marginBottom: open ? 120 : 15,
                        zIndex: 1000,
                        position: 'absolute'

                    }}
                    open={open}
                    value={selectedDate}
                    items={orderDates}
                    setOpen={setOpen}
                    setValue={setSelectedDate}
                    setItems={setOrderDates}
                    placeholder="choose order date"
                    // onOpen={onGenderOpen}
                    // onChangeValue={onChange}
                />
            </View>

            <ScrollView style={{marginTop: 50}}>
                {selectedDate == "" ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>
                            No data to show
                        </Text>
                    </View>
                ) : orders.length > 0 ? (
                    <View>
                        {/* <View style={{ paddingVertical: 5, flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
                            <Text style={{ color: 'gray' }}>Orders from last 15 days</Text>
                        </View> */}
                        {orders
                            .filter((order => order._id == selectedDate))
                            .map((order) => (
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
                    </View>

                ) : (
                    <Text>No orders found</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
