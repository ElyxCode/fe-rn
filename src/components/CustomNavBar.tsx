import {Pressable, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackArrowIcon from '../assets/arrow_left.svg';
import BackArrowWhiteIcon from '../assets/arrow_left_white.svg';

import {colors} from '../styles/colors';

type Props = {
  titleText?: string;
  primaryColorDefault?: boolean;
};

export const CustomNavBar = ({
  titleText,
  primaryColorDefault = true,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        {primaryColorDefault ? (
          <BackArrowIcon height={25} width={25} />
        ) : (
          <BackArrowWhiteIcon height={25} width={25} />
        )}
      </Pressable>
      <Text
        style={[
          styles.titleText,
          {color: primaryColorDefault ? colors.PrimaryTextColor : colors.White},
        ]}>
        {titleText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    columnGap: 15,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
