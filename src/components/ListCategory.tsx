import {Image, StyleSheet, View} from 'react-native';
import LinkTop from './LinkTop';

const ListCategory = () => {
  return (
    <>
      <LinkTop title={'Category'} />
      <View style={styles.container}>
        <View>
          <Image source={require('../../assets/Group9.png')} />
        </View>
        <View>
          <Image source={require('../../assets/Group8.png')} />
        </View>
        <View>
          <Image source={require('../../assets/Group10.png')} />
        </View>
        <View>
          <Image source={require('../../assets/Group11.png')} />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListCategory;
