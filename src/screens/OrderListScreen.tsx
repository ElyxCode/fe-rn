import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useAppSelector} from '../hooks/useRedux';

import {CustomNavBar} from '../components/CustomNavBar';
import {LoaderScreen} from './LoaderScreen';

import {getOrdersService} from '../services/Order';

import {Order} from '../model/Order';

import {colors} from '../styles/colors';

type OrderItemProps = {
  id: string;
  branchImage: string;
  branchName: string;
  amountProduct: string;
  totalPrice: string;
  orderStatus: string;
};

export const OrderListScreen = ({router, navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const token = useAppSelector(state => state.authToken.token);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      const response = await getOrdersService(token);
      if (response.ok) {
        setOrders(response.data as Order[]);
      } else {
        console.log({error: response.originalError});
      }
      setIsLoading(false);
    };

    getOrders();
  }, []);

  const OrderItem = ({
    id,
    branchImage,
    branchName,
    amountProduct,
    totalPrice,
    orderStatus,
  }: OrderItemProps) => {
    return (
      <Pressable>
        <View style={styles.orderItemContainer}>
          <View
            style={{
              height: 48,
              width: 48,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={{uri: branchImage}} height={48} width={48} />
          </View>
          <View style={styles.orderItemDescriptionContainer}>
            <Text style={styles.nameText}>{branchName}</Text>
            <Text style={styles.amountItemTotalText}>
              {amountProduct} Productos · ${totalPrice}
            </Text>
            <Text style={styles.orderStatusText}>{orderStatus}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <CustomNavBar titleText="Mis ordenes" />
          <ScrollView style={styles.container}>
            {orders.map(order => (
              <OrderItem
                key={order.id}
                id={order.id.toString()}
                branchImage={order.branch.logo}
                branchName={order.branch.name}
                amountProduct={order.quantity.toString()}
                totalPrice={order.total}
                orderStatus={order.state}
              />
            ))}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  orderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 21,
    borderRadius: 10,
    backgroundColor: colors.White,
    marginBottom: 10,
  },
  orderItemDescriptionContainer: {
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  nameText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
  amountItemTotalText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryTextColor,
  },
  orderStatusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.SecondaryTextColor,
  },
});
