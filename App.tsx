/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, RootState } from './src/store/store';
import { Alert, Button, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BILDIT_BLACK, BILDIT_PINK, BILDIT_WHITE } from './constants';
import { Picker } from '@react-native-picker/picker';
import { setUser } from './src/store/userSlice';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { addExpense, deleteExpense } from './src/store/expenseSlice';

function AddAndSeeExpenses() {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const [tabSelected, setTabSelected] = useState('add');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  
  const categories = [
    'Food & Dining',
    'Transportation',
    'Housing',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Other'
  ];

  const handleAddExpense = () => {
    if (!amount || !category) {
      Alert.alert('Please fill all required fields');
      return;
    }
    dispatch(addExpense({
      amount: Number(amount),
      category,
      notes
    }));
    setAmount('');
    setCategory('');
    setNotes('');
  };

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.containerStyle}>
        <ImageBackground
          source={require('./src/assets/background.webp')}
          style={styles.imageStyle}
          resizeMode="cover"
        >
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              <View style={styles.headerStyle}>
                <Text style={{color: BILDIT_BLACK, fontSize: 20, fontWeight: 'bold'}}>BILD</Text>
                <Text style={{color: BILDIT_PINK, fontSize: 20, fontWeight: 'bold'}}>IT</Text>
              </View>
              
              {/* Tabs */}
              <View style={{width: "100%", flexDirection: 'row', paddingHorizontal: 20}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: tabSelected === 'add' ? BILDIT_PINK : BILDIT_WHITE,
                    padding: 10,
                    borderRadius: 5,
                    margin: 5
                  }}
                  onPress={() => setTabSelected('add')}
                >
                  <Text style={{
                    color: tabSelected === 'add' ? BILDIT_WHITE : BILDIT_PINK,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>Add Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: tabSelected === 'see' ? BILDIT_PINK : BILDIT_WHITE,
                    padding: 10,
                    borderRadius: 5,
                    margin: 5
                  }}
                  onPress={() => setTabSelected('see')}
                >
                  <Text style={{
                    color: tabSelected === 'see' ? BILDIT_WHITE : BILDIT_PINK,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>See Expenses</Text>
                </TouchableOpacity>
              </View>

              {tabSelected === 'add' && (
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold', marginTop: 20}}>Amount (USD)</Text>
                  <TextInput
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    style={{
                      marginVertical: 10,
                      color: BILDIT_BLACK,
                      fontSize: 16,
                      borderWidth: 1,
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: BILDIT_WHITE,
                      borderColor: BILDIT_BLACK
                    }}
                    value={amount}
                    onChangeText={setAmount}
                  />

                  <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold'}}>Category</Text>
                  <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={{
                      width: '100%',
                      backgroundColor: BILDIT_WHITE,
                      borderRadius: 12,
                      marginVertical: 10,
                    }}
                    dropdownIconColor={BILDIT_BLACK}
                  >
                    <Picker.Item label="Select a category" value="" />
                    {categories.map((cat) => (
                      <Picker.Item key={cat} label={cat} value={cat} />
                    ))}
                  </Picker>

                  <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold'}}>Notes</Text>
                  <TextInput
                    placeholder="Additional notes (optional)"
                    style={{
                      marginVertical: 10,
                      color: BILDIT_BLACK,
                      fontSize: 16,
                      borderWidth: 1,
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: BILDIT_WHITE,
                      borderColor: BILDIT_BLACK,
                      minHeight: 100,
                      textAlignVertical: 'top'
                    }}
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                  />

                  <TouchableOpacity
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 15,
                      backgroundColor: BILDIT_PINK,
                      borderRadius: 12,
                      marginTop: 20
                    }}
                    onPress={handleAddExpense}
                  >
                    <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold'}}>Add Expense</Text>
                  </TouchableOpacity>
                </View>
              )}

              {tabSelected === 'see' && (
                <View style={{paddingHorizontal: 20}}>
                  {expenses.map((expense) => (
                    <View key={expense.id} style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: BILDIT_WHITE,
                      borderRadius: 10,
                      padding: 15,
                      marginVertical: 5
                    }}>
                      <View style={{flex: 1}}>
                        <Text style={{color: BILDIT_BLACK, fontWeight: 'bold'}}>${expense.amount}</Text>
                        <Text style={{color: BILDIT_PINK}}>{expense.category}</Text>
                        {expense.notes && <Text style={{color: BILDIT_BLACK}}>{expense.notes}</Text>}
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: BILDIT_PINK,
                          borderRadius: 5,
                          padding: 8
                        }}
                        onPress={() => dispatch(deleteExpense(expense.id))}
                      >
                        <Text style={{color: BILDIT_WHITE, fontWeight: 'bold'}}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}

function UserForm(){
  const anualIncomeOptions = [
    {label: 'Less than 10,000', value: 10000},
    {label: '10,000 - 50,000', value: 50000},
    {label: '50,000 - 100,000', value: 100000},
    {label: 'More than 100,000', value: 1000000},
  ];
  const usageOptions = [
    {label: 'Save money', value: 'save'},
    {label:'Track spending', value: 'track'},
    {label:'Other', value: 'other'},
  ];
  const [otherUsage, setOtherUsage] = useState('');
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const toggleIsTermsChecked=()=>{
    setIsTermsChecked(!isTermsChecked);
  }
  const toggleNameFocus = () => {
    setIsNameFocused(!isNameFocused);
  };

  const handleNext = () => {
    if(!isTermsChecked){
      Alert.alert('Please accept the terms and conditions');
      return;
    }
    if(name === '' || name === null || name === undefined){
      //show error message
      Alert.alert('Please enter your name');
      return;
    }
    if(anualIncome === 0 || anualIncome === null || anualIncome === undefined){
      //show error message
      Alert.alert('Please enter your anual income');
      return;
    }
    if(usage === '' || usage === null || usage === undefined){
      //show error message
      Alert.alert('Please select your usage');
      return;
    }
    if(usage === 'other' && otherUsage === '' || otherUsage === null || otherUsage === undefined){
      //show error message
      Alert.alert('Please enter a reason for selecting other');
      return;
    }
    dispatch(setUser({name, anualIncome, usage, otherUsage}));
  };
  useEffect(() => {
    //console log user data from store
    console.log(store.getState().user);
  }, []);
  const dispatch = useDispatch();
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [name, setName] = useState('');
  const [anualIncome, setAnualIncome] = useState<number>(anualIncomeOptions[0].value);
  const [usage, setUsage] = useState('');
  return (
    <View style={styles.backgroundStyle}>
          <View style={styles.containerStyle}>
            <ImageBackground
              source={require('./src/assets/background.webp')}
              style={styles.imageStyle}
              resizeMode="cover"
            >
              <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                  <View style={styles.headerStyle}>
                    <Text style={{color: BILDIT_BLACK, fontSize: 20, fontWeight: 'bold'}}>BILD</Text>
                    <Text style={{color: BILDIT_PINK, fontSize: 20, fontWeight: 'bold'}}>IT</Text>
                  </View>
                  <View style={styles.welcomeStyle}>
                  <Text style={{color: BILDIT_WHITE, fontSize: 20, fontWeight: 'bold'}}>
                    Welcome to BILDIT Finance Management
                  </Text>
                  <Text style={{color: BILDIT_WHITE, fontSize: 16,}}>
                    In this app, you can manage your finance and get insights into your spending.
                    To get started please fill out the form below.
                  </Text>
                  </View>
                  <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 20}}>
                  <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold'}}>Name</Text>
                  <TextInput
                    placeholder="Name"
                    style={{marginVertical: 10, color: BILDIT_BLACK, fontSize: 16, borderWidth: 1, width: '100%', padding: 10, borderRadius: 10, backgroundColor: BILDIT_WHITE, borderColor: isNameFocused ? BILDIT_PINK : BILDIT_BLACK}}
                    focusable={true}
                    onFocus={() => {
                      toggleNameFocus();
                    }}
                    onBlur={()=>{
                      toggleNameFocus();
                    }}
                    value={name}
                    onChangeText={setName}
                    />
                  </View>
                  <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 20}}>
                    <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold'}}>Anual Income (USD)</Text>
    
                    <Picker
                      selectedValue={anualIncome}
                      onValueChange={(itemValue) => setAnualIncome(itemValue)}
                      style={{ 
                        width: '100%',
                        backgroundColor: BILDIT_WHITE, 
                        borderRadius: 12,
                        marginVertical: 10,
                      }}
                      dropdownIconColor={BILDIT_BLACK} 
                      mode="dialog" 
                    >
                      {anualIncomeOptions.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                      ))}
                    </Picker>
                  </View>                       
                  <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20}}>
                    <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold'}}>What are you looking for?</Text>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 10}}>
                      {usageOptions.map((option) => (
                        <TouchableOpacity 
                          key={option.value}
                          onPress={() => setUsage(option.value)}
                          style={{
                            flex: 1,
                            marginHorizontal: 4,
                            padding: 10,
                            backgroundColor: usage === option.value ? BILDIT_PINK : BILDIT_WHITE,
                            borderWidth: 1,
                            borderColor: usage === option.value ? BILDIT_PINK : BILDIT_WHITE,
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Text style={{
                            color: usage === option.value ? BILDIT_WHITE : BILDIT_PINK,
                            fontWeight: usage === option.value ? 'bold' : 'normal',
                            textAlign: 'center'
                          }}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {usage === 'other' && (
                        <TextInput
                          placeholder="Other"
                          style={{marginVertical: 10, color: BILDIT_BLACK, fontSize: 16, borderWidth: 1, width: '100%', padding: 10, borderRadius: 10, backgroundColor: BILDIT_WHITE, borderColor: isNameFocused ? BILDIT_PINK : BILDIT_BLACK}}
                          value={otherUsage}
                          onChangeText={setOtherUsage}
                        />
                      )}
                  </View>
                  <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <BouncyCheckbox
                        size={20}
                        fillColor={BILDIT_PINK}
                        onPress={toggleIsTermsChecked}
                        isChecked={isTermsChecked}
                        text='I agree to the terms and conditions'
                        textStyle={{color:BILDIT_WHITE, fontWeight:'bold'}}
                      />
                    </View>
                  </View>
                </ScrollView>
                
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(255,255,255,0.8)'}}>
                  <TouchableOpacity 
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 15,
                      backgroundColor: BILDIT_PINK,
                      borderRadius: 12,
                    }}
                    
                    onPress={() => {handleNext()}}
                  >
                    <Text style={{color: BILDIT_WHITE, fontSize: 16, fontWeight: 'bold'}}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
  )
}


function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <AddAndSeeExpenses />
        </ScrollView>
        </KeyboardAvoidingView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  backgroundStyle:{
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BILDIT_PINK, padding:20,
  },
  containerStyle: {
    width: '100%', height: '100%', backgroundColor: BILDIT_WHITE, borderRadius:12, overflow: 'hidden',
  },
  imageStyle: {
    width: '100%', height: '100%',
  },
  headerStyle:{
    width: '100%', backgroundColor: BILDIT_WHITE, borderTopLeftRadius:12, borderTopRightRadius:12, justifyContent:'flex-start', alignItems:'center', padding: 20, flexDirection: 'row',
  },
  headerText:{
    fontSize: 20, fontWeight: 'bold', color: BILDIT_PINK,
  },
  welcomeStyle:{
    width: '100%',  justifyContent:'center', alignItems:'center', padding: 20,
  },
});
export default App;
