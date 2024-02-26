import {useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CloseCircle from '../assets/close_circle.svg';

import {colors} from '../styles/colors';

interface SearchInputProps {
  textChanged: (e: string) => Promise<void>;
  inputValue: string;
  onPressCloseIcon: () => void;
  title: string;
  onSubmit: () => Promise<void>;
  editable?: boolean;
}

export const SearchInput = ({
  textChanged,
  inputValue,
  onPressCloseIcon,
  title,
  onSubmit,
  editable,
}: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.searchContainer}>
        <View style={styles.leftContainer}>
          <TextInput
            value={inputValue}
            onChangeText={e => {
              textChanged(e);
            }}
            numberOfLines={1}
            style={styles.text}
            editable={editable}
            onSubmitEditing={onSubmit}></TextInput>
        </View>
        {inputValue.length !== 0 ? (
          <TouchableOpacity onPress={onPressCloseIcon}>
            <CloseCircle height={16} width={16} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    backgroundColor: colors.White,
    borderRadius: 10,
    marginBottom: 20,
  },
  leftContainer: {
    flex: 1, // Esto hace que los elementos en este contenedor ocupen todo el espacio disponible
    flexDirection: 'row', // Esto coloca los elementos en una fila horizontal
    alignItems: 'center', // Esto alinea verticalmente los elementos al centro
    justifyContent: 'flex-start', // Esto alinea los elementos a la izquierda del contenedor
  },
  text: {
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    flex: 1,
    color: colors.DarkGrayColor,
  },
  title: {
    color: colors.PrimaryColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
});
