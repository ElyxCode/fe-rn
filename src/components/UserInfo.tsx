import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import ProfileCircleIcon from '../assets/profile_circle.svg';
import PencilEditIcon from '../assets/pencil_edit.svg';

import {colors} from '../styles/colors';

type Props = {
  userName: string;
  userEmail: string;
  userTelNumber: string;
};

export const UserInfo = ({userName, userEmail, userTelNumber}: Props) => {
  return (
    <Pressable onPress={() => console.log('editar')}>
      <View style={styles.container}>
        <View style={styles.profileIconContainer}>
          <ProfileCircleIcon height={25} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>{userName}</Text>
          <Text style={styles.userInfoText}>{userEmail}</Text>
          <Text style={styles.userInfoText}>{userTelNumber}</Text>
        </View>
        <View style={styles.pencilIconContainer}>
          <PencilEditIcon height={24} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 5,
  },
  profileIconContainer: {
    justifyContent: 'center',
    backgroundColor: colors.PrimaryColor,
    borderRadius: 25,
    height: 49,
    padding: 11,
  },
  userInfoContainer: {
    flex: 1,
    marginHorizontal: 15,
    rowGap: 10,
  },
  userInfoText: {
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  pencilIconContainer: {
    justifyContent: 'center',
  },
});
