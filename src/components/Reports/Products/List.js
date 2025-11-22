import { StyleSheet, View, Animated, } from 'react-native'
import NotFound from '../../UI/NotFound'
import ProductItem from './Item'

export default function ProductsList({ items, }) {    
    return (
       <Animated.FlatList
            data={items}
            renderItem={({ item }) => <ProductItem item={item}/>}
            keyExtractor={(item, index) => index.toString()}
            style={[styles.container]}
            contentContainerStyle={{paddingBottom: 12, flexGrow: 1,}}
            ItemSeparatorComponent={() => <View style={{height: 12}} />}
            ListEmptyComponent={<NotFound text="Товарів не знайдено" css={{paddingTop: 50}}/>}/>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1,
    },
})
