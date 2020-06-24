import { Feather } from '@expo/vector-icons';
import * as React from 'react';

export default function LogoutIcon(props) {
  return (
    <Feather
      name={props.name}
      size={24}
      style={{marginRight: 15}}
      color="#2f95dc"
      onPress={props.onPress}
    />
  );
}
