import React, { useState } from "react"
import { ActivityIndicator, FlatList, SafeAreaView,Text,View} from "react-native"
import { CustomNavBar } from "../../components/CustomNavBar"
import { ProductItemRender } from "../../components/ProductItemRender"
import { SearchInput } from "../../components/SearchInput"
import { colors } from "../../styles/colors"
import { styles } from "./style"


export const SearchProductsScreen = ({route,navigation}:any) => {

    const { branchData, productResponse} = route.params;
   
    const [inputValue, setInputValue] = useState('');
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [nextPageProduct, setNextPageProduct] = useState<string | null | undefined>('');

    const textChanged= async (text:string)=> {

    }

    const clearText = () =>{
      setInputValue('')
    }

    // carga mas productos
  const loadMoreProducts = async () => {
    setLoadMore(true);
    // console.log('loadmore');
    // const response = await nextPageProductsService(
    //   branchId,
    //   nextPageProduct ?? '',
    //   category.categoryId,
    // );

    // if (response.ok ) {
    //   setNextPageProduct(response.data?.links.next);
    //   setProductResponse(response.data);
    // } else {
    //   console.log({error: response.originalError});
    // }

    setLoadMore(false);
  };

    return(
        <SafeAreaView>
            <CustomNavBar></CustomNavBar>
            <View style={styles.container}>
                
                <SearchInput textChanged={(e) =>  textChanged(e) }
                 onPressCloseIcon={clearText} inputValue={inputValue}
                 title='Buscar Producto'
                 ></SearchInput>
           <FlatList
          
          data={productResponse?.data}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({item}) => (
            <ProductItemRender product={item} navigation={navigation} />
          )}
          scrollEnabled={!loadMore}
          ItemSeparatorComponent={() => <View style={{height: 15}}></View>}
          keyExtractor={item => item.id.toString() + Math.random() * 3}
          initialNumToRender={20}
          onEndReachedThreshold={0.001}
          onEndReached={() => {
            if (
              nextPageProduct !== null &&
              nextPageProduct !== '' &&
              nextPageProduct !== undefined
            ) {
              loadMoreProducts();
            } else {
              console.log('No hay mas items');
            }
          }}
          ListFooterComponent={
            loadMore ? (
              <>
                <View
                  style={{
                    height: 25,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={25} color={colors.PrimaryColor} />
                </View>
              </>
            ) : null
          }
        />

            </View>
        </SafeAreaView>
    )
} 