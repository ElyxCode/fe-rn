import {Pressable, StyleSheet, View, Text} from 'react-native';

import BackArrow from '../assets/arrow_left.svg';

import {colors} from '../styles/colors';

type Props = {
  titleText?: string;
};

export const BackButtonBar = ({titleText}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('back')}>
        <BackArrow height={25} width={25} />
      </Pressable>
      <Text style={styles.titleText}>{titleText}</Text>
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
