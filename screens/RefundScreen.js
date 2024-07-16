import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import moment from "moment";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import RefundItem from "../components/RefundItem";

const RefundScreen = () => {
  const order = useSelector((state) => state.order.latestOrder);
  const { userId, setUserId } = useContext(UserType);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0)
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [selectedProducts, setSelectedProducts] = useState([])
  const [productList, setproductList] = useState([])

  useEffect(() => {
    const manageProductList = () => {
      const orderList = order.products.map((product) => {
        return { key: product?._id, value: product?.name }
      })
      setproductList(orderList)
      setLoading(false);
    };
    manageProductList();
  }, []);

  const raiseRefund = async () => {
    console.log("raiseRefund ------");
    const { products, _id, __v, ...rest } = order
    const returnOrders = {
      ...rest,
      products: order.products.filter((product) => product.returnQuantity > 0),
      order_id: order._id,
      status:''
    }
    const response = await axios.post(
      `http://13.233.20.152/saveRefundOrder`, returnOrders
    );
    console.log(response);
    Alert.alert("Refund raised successfully. Please wait for 2-3 days for furthur process.")
    navigation.replace('Main')
  }

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
      <View style={{ paddingVertical: 5, flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
        <Text style={{ color: 'gray' }}>Last Order Created</Text>
      </View>

      <Pressable
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#d0d0d0",
          marginHorizontal: 10,
        }}
        key={order?._id}
      >
        <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 20 }}>
          <View>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}> Order No:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: '#088F8F' }}> #{order?._id}</Text>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}> Payment Type:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000000' }}> {order?.paymentMethod}</Text>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}> Subtotal:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000000' }}> {order?.totalPrice}</Text>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}> Created Date:</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: '#000000' }}> {moment(order?.createdAt).format('Do MMMM YYYY, h:mma')}</Text>
            </View>
          </View>
        </View>
        <View>
          <MultipleSelectList
            setSelected={(val) => setSelectedProducts(val)}
            data={productList}
            save="value"
            label="Refund for Products"
          />
        </View>
        <View style={{ borderTopColor: 'lightgray', borderTopWidth: 1 }}>


          {order?.products?.length > 0 &&
            order?.products
              .filter((prod) => {
                const index = selectedProducts.findIndex((selectedProd) => prod.name === selectedProd)
                return index > -1
              })
              .map((item, index) => (
                <RefundItem item={item} key={index} />
              ))}


        </View>
        <Pressable style={{ backgroundColor: "#f3b318", borderRadius: 4 }}
          onPress={raiseRefund}>
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
            Raise a refund
          </Text>
        </Pressable>
      </Pressable>

    </ScrollView>
  );
};

export default RefundScreen;

const styles = StyleSheet.create({});
