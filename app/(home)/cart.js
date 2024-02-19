import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, } from "react-native";
import Modal from "react-native-modal";
import CheckBox from 'expo-checkbox';
import React, { useState } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart, decrementQuantity, incrementQuantity } from "../../redux/CartReducer";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const cart = ({ item, menu }) => {
  const [selectedInstructions, setSelectedInstructions] = useState([]);
  const [showAddInstructionsPopup, setShowAddInstructionsPopup] = useState(false);
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [isCulterySelected, setIsCulterySelected] = useState(false);
  const [isRemoveIconSelected, setIsRemoveIconSelected] = useState(false);
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isFeedingIndiaDonationSelected, setIsFeedingIndiaDonationSelected] = useState(false);

  const handleFeedingIndiaDonationChange = (newValue) => {
    setIsFeedingIndiaDonationSelected(newValue);
    // Handle logic to add or remove Rs 3 from the total based on newValue
    // You might want to dispatch an action or directly update the total state here
  };

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const toggleInstructionSelection = (instructionId) => {
    // Check if the instructionId is already in selectedInstructions
    if (selectedInstructions.includes(instructionId)) {
      // If yes, remove it
      setSelectedInstructions((prevInstructions) =>
        prevInstructions.filter((id) => id !== instructionId)
      );
    } else {
      // If no, add it
      setSelectedInstructions((prevInstructions) => [...prevInstructions, instructionId]);
    }
  };
  const instructions = [
    {
      id: "0",
      name: "Avoid Ringing",
      iconName: "bell",
    },
    {
      id: "1",
      name: "Leave at the door",
      iconName: "door-open",
    },
    {
      id: "2",
      name: "directions to reach",
      iconName: "directions",
    },
    {
      id: "3",
      name: "Avoid Calling",
      iconName: "phone-alt",
    },
  ];
  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);
  return (
    <>
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "#F0F8FF" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="black" />
          <Text>{params?.name}</Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            marginTop: 15,
            borderRadius: 8,
          }}
        >
          <Text>
            Delivery in <Text style={{ fontWeight: "500" }}>35 - 40 mins</Text>
          </Text>
        </View>

        <View style={{ marginVertical: 12 }}>
          <Text
            style={{
              textAlign: "center",
              letterSpacing: 3,
              fontSize: 15,
              color: "gray",
            }}
          >
            ITEM(S) ADDED
          </Text>
        </View>

        <View>
          {cart?.map((item, index) => (
            <Pressable
              style={{ backgroundColor: "white", padding: 10 }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 6,
                }}
              >
                <Text style={{ width: 200, fontSize: 16, fontWeight: "600" }}>
                  {item?.name}
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignItems: "center",
                    borderColor: "#BEBEBE",
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      dispatch(decrementQuantity(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "green",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 19,
                        color: "green",
                        paddingHorizontal: 8,
                        fontWeight: "600",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      dispatch(incrementQuantity(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "green",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  ₹{item.price * item.quantity}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Quantity : {item?.quantity}
                </Text>
              </View>
            </Pressable>
          ))}

          <View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                Delivery Instructions
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {instructions?.map((item, index) => (
                  <Pressable
                    key={index}
                    style={{
                      margin: 10,
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: selectedInstructions.includes(item.id) ? "blue" : "white",
                    }}
                    onPress={() => toggleInstructionSelection(item.id)}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <FontAwesome5
                        name={item?.iconName}
                        size={22}
                        color={selectedInstructions.includes(item.id) ? "white" : "gray"}
                      />
                      <Text
                        style={{
                          width: 75,
                          fontSize: 13,
                          color: selectedInstructions.includes(item.id) ? "white" : "#383838",
                          paddingTop: 10,
                          textAlign: "center",
                        }}
                      >
                        {item?.name}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Pressable
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Feather name="plus-circle" size={24} color="black" />
                  <Text>Add more Items</Text>
                </Pressable>
                <AntDesign  onPress={() => router.back()} name="right" size={20} color="black" />
              </View>

              <Pressable
                onPress={() => setShowAddInstructionsPopup(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Entypo name="new-message" size={24} color="black" />
                  <Text>Add more cooking instructions</Text>
                </View>
                <AntDesign name="right" size={20} color="black" />
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={24}
                    color="black"
                  />
                  <Text>Dont't send cutlery with this order</Text>
                </View>
                <CheckBox
                    value={isFeedingIndiaDonationSelected}
                    onValueChange={(newValue) => handleFeedingIndiaDonationChange(newValue)}
                />
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                marginVertical: 10,
              }}
              >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
  <View style={{ flex: 1 }}>
    <Text>Feeding India Donation</Text>
  </View>
  <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ color: "gray" }}>
      Working towards a malnutrition-free India
    </Text>
  </View>
  <View style={{ flex: 1, alignItems: "flex-end" }}>
    <Text>Rs 3</Text>
  </View>
  <View style={{ flex: 1, alignItems: "flex-end" }}>
    <CheckBox
      disabled={false}
      value={isCulterySelected}
      onValueChange={(newValue) => setIsCulterySelected(newValue)}
    />
  </View>
</View>

            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Billing Details
            </Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 7,
                padding: 10,
                marginTop: 14,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  Item Total
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  ₹{total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  Delivery Fee
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  ₹15.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  Delivery Partner Fee
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
                >
                  ₹75
                </Text>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    To pay
                  </Text>
                  <Text>₹{total + 90}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Pay Using Cash
            </Text>
            <Text style={{ marginTop: 7, fontSize: 15 }}>Cash on Delivery</Text>
          </View>

          <Pressable
            onPress={() => {
              dispatch(cleanCart());
              router.push({
                pathname: "/order",
                params: {
                  name: params?.name,
                },
              });
            }}
            style={{
              backgroundColor: "#fd5c63",
              padding: 10,
              width: 200,
              borderRadius: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <View>
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {total + (isCulterySelected ? 95 : 92)}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontWeight: "500",
                  marginTop: 3,
                }}
              >
                TOTAL
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}

      {/* Add more cooking instructions popup */}
      <Modal
        isVisible={showAddInstructionsPopup}
        onBackdropPress={() => setShowAddInstructionsPopup(false)}
      >
        <View style={{ padding: 20, backgroundColor: "white", borderRadius: 8 }}>
          <TextInput
            placeholder="Enter additional cooking instructions"
            onChangeText={(text) => setAdditionalInstructions(text)}
          />
          <Pressable
            style={{ marginTop: 10, backgroundColor: "#fd5c63", padding: 10, borderRadius: 6 }}
            onPress={() => {
              // Handle the submission of additional instructions
              setShowAddInstructionsPopup(false);
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Submit</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default cart;

const styles = StyleSheet.create({});