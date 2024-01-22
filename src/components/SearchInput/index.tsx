
import { useState } from 'react';
import {
    FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseCircle from '../../assets/close_circle.svg';
import {styles} from './styles'

interface SearchInputProps {
 textChanged:(e: string) => Promise<void>;
 inputValue:string;
 onPressCloseIcon:() => void;
 title:string;
 onSubmit: () => Promise<void>;

}

export const SearchInput = ({textChanged,inputValue, onPressCloseIcon,title, onSubmit}:SearchInputProps) => {
    const [isButtonVisible, setButtonVisible] = useState(false);

    
    return (
      <View style={styles.container}> 
        <Text style={styles.title}>{title}</Text>
        <View style={styles.searchContainer}>
        <View style={styles.leftContainer}>
          <TextInput
            value={inputValue}
            onChangeText={e => {
             
              textChanged(e)
             

            }}
            numberOfLines={1}
            style={styles.text}
            onSubmitEditing={onSubmit}
            ></TextInput>
        </View>
        {isButtonVisible ? (
          <TouchableOpacity onPress={onPressCloseIcon}>
            <CloseCircle  height={16} width={16} />
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
      </View>
    )
}