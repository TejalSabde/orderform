import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const navigation = useNavigation();
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [outletList, setOutletList] = useState([]);

  useEffect(() => {
    const getOutletList = async () => {
      axios
        .get("http://13.233.20.152/outletList")
        .then((response) => {
          console.log(response);
          let newArray = response.data.map((item, index) => {
            return { key: item.index, value: item }
          });
          setOutletList(newArray)
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "Not able to fetch outlet list. Please try again after sometime.");
        });
    };
    getOutletList();
  }, []);

  const handleRegister = () => {
    const user = {
      email: email,
      password: password,
      outlet: selectedOutlet
    };
    console.log(user)
    // send a POST  request to the backend API to register the user
    axios
      .post("http://13.233.20.152/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setSelectedOutlet("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center", marginTop: 50 }}
    >
      {/* <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View> */}
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Register to your Account
            </Text>
          </View>

          <View style={{ marginTop: 70 }}>
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Ionicons
                name="ios-person"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="enter your name"
              />
            </View> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Email"
              />
            </View>
          </View>


          <View style={{
            flexDirection: 'row',
            alignItems: "center",
            backgroundColor: "#D0D0D0",
            // paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}>
            <Entypo
              style={{ marginLeft: 8 }}
              name="shop" size={24} color="gray" />
            <SelectList
              placeholder="Select your outlet"
              boxStyles={{ width: 350, paddingVertical: 18, borderRadius: 5, borderColor: '#D0D0D0' }}
              inputStyles={{ color: "gray" }}
              setSelected={setSelectedOutlet} data={outletList} />
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 80 }} />

          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#f3b318",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
