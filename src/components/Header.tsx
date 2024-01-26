import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>BookStore</Text>
      </View>
      <View>
        <Image style={styles.image} source={require('../../assets/user.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: 'red',
    textTransform: 'uppercase',
  },

  image: {
    width: 50,
    height: 50,
  },
});

export default Header;
