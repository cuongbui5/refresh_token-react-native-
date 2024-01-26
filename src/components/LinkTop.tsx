import React from 'react';
import {Text, View} from 'react-native';

type LinkTopProps = {
  title: string;
};
const LinkTop = ({title}: LinkTopProps) => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text>{title}</Text>
      </View>
      <View>
        <Text>xem thêm</Text>
      </View>
    </View>
  );
};
export default LinkTop;
