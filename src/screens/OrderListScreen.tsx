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

import {getOrderState} from '../utils/utilities';

import {colors} from '../styles/colors';

type OrderItemProps = {
  order: Order;
};

export const OrderListScreen = ({navigation}: any) => {
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

  const OrderItem = ({order}: OrderItemProps) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('OrderDetailScreen', {order})}>
        <View style={styles.orderItemContainer}>
          <View
            style={{
              height: 48,
              width: 48,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: order.branch.logo}}
              height={48}
              width={48}
              style={{
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
          <View style={styles.orderItemDescriptionContainer}>
            <Text
              style={styles.nameText}
              lineBreakMode="tail"
              numberOfLines={1}>
              {order.branch.name}
            </Text>
            <Text style={styles.amountItemTotalText}>
              {order.quantity.toString()} Productos · ${order.total}
            </Text>
            <Text style={styles.orderStatusText}>
              {getOrderState(order.state)}
            </Text>
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
              <OrderItem key={order.id} order={order} />
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
    marginBottom: 10,
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
    rowGap: 10,
    paddingLeft: 20,
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
