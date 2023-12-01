
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { AddButton } from "../components/AddButton";
import { AddressListCell } from "../components/AddressListCell";
import { CustomNavBar } from "../components/CustomNavBar";
import { useAppSelector } from "../hooks/useRedux";
import { Address } from "../model/Address";
import { ReadAll } from "../services/Address";


export const AddressListScreen =  () => {

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {token, social} = useAppSelector(state => state.authToken);

 

  useEffect(() => {
    const getAddresses = async () => {
      setIsLoading(true);
      const response = await ReadAll(token);
      if (response.ok) {
        setAddresses(response.data as Address[]);
      } else {
        console.log({error: response},"address error");
      }
      setIsLoading(false);
    };
    getAddresses()
  }, []);
  

    return(
      <>
      <SafeAreaView style={{ flex:1}}> 
      <CustomNavBar titleText="Direcciones de envío" ></CustomNavBar>
        
       
      <FlatList
            
              contentContainerStyle={{paddingHorizontal: 20}}
            
              data={addresses}
              renderItem={({item}) => <AddressListCell address={item} />}
              keyExtractor={item => item.id.toString()}
             ItemSeparatorComponent={() => <View style={{width: 12, backgroundColor:'red'}}></View>}
            />

     
      <AddButton text="Agregar dirección" ></AddButton>
      

      </SafeAreaView>

      </>
    );
}

