import {Pressable, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackArrowIcon from '../assets/arrow_left.svg';
import BackArrowWhiteIcon from '../assets/arrow_left_white.svg';
import SearchIcon from '../assets/search_home.svg';

import {colors} from '../styles/colors';

type Props = {
  titleText?: string;
  primaryColorDefault?: boolean;
  navigationPath?: string;
  resetRootNavigation?: boolean;
  showSearchIcon?: boolean;
  onSearchIconPress?: () => void;
};

export const CustomNavBar = ({
  titleText,
  primaryColorDefault = true,
  navigationPath,
  resetRootNavigation = false,
  showSearchIcon = false,
  onSearchIconPress
}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (navigationPath) {
            if (resetRootNavigation) {
              navigation.reset({
                index: 0,
                routes: [{name: navigationPath}],
              } as never);
              return;
            }
            navigation.navigate(navigationPath as never);
          } else {
            navigation.goBack();
          }
        }}>
        {primaryColorDefault ? (
          <BackArrowIcon height={25} width={25} />
        ) : (
          <BackArrowWhiteIcon height={25} width={25} />
        )}
      </Pressable>
      <Text numberOfLines={1}
        style={[
          styles.titleText,
          {color: primaryColorDefault ? colors.PrimaryTextColor : colors.White},
        ]}>
        {titleText}
      </Text>
      {
       showSearchIcon && ( <View style={{flex:1, alignItems:'flex-end', paddingLeft:10}}>
       <SearchIcon onPress={onSearchIconPress} height={24} ></SearchIcon>
       </View>)
      }
      
      
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
    flex:3,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    
  },
});
