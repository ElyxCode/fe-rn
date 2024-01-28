import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SearchInput} from '../components/SearchInput';
import {BranchItemRender} from '../components/BranchHomeList';

import {LoaderScreen} from './LoaderScreen';

import {Branch} from '../model/Branch';

export const SearchBranchsScreen = ({navigation, route}: any) => {
  const {branchs} = route.params;
  const [inputValue, setInputValue] = useState<string>('');
  const [currentBranchs, setCurrentBranchs] = useState<Branch[]>(branchs ?? []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const textChanged = async (text: string) => {
    setInputValue(text);
  };

  const searchBranchs = async () => {
    setIsLoading(true);
    if (inputValue.length === 0) {
      setCurrentBranchs(branchs);
      setIsLoading(false);
      return;
    }

    let branchsFilters =
      currentBranchs.filter(item =>
        item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
      ) ?? ([] as Branch[]);

    setCurrentBranchs(branchsFilters);
    setIsLoading(false);
  };

  const clearText = () => {
    setInputValue('');
    setCurrentBranchs(branchs);
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SearchInput
          title="Comienza a explorar"
          textChanged={e => textChanged(e)}
          onPressCloseIcon={clearText}
          inputValue={inputValue}
          onSubmit={searchBranchs}
        />
        <FlatList
          data={currentBranchs}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          style={{paddingHorizontal: 20}}
          renderItem={({item}) => (
            <BranchItemRender
              id={item.id.toString()}
              img={item.banner}
              icon={item.logo}
              name={item.name}
              rate={item.rating}
              deliveryTime={item.delivery_time?.toString()}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 15}}></View>}
          keyExtractor={item => item.id.toString() + Math.random() * 3}
          initialNumToRender={20}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
