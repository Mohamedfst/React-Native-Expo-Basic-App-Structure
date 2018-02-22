import React from 'react';
import { Button,Text, View, StyleSheet   } from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Feed </Text>
        <Button
          title="Create A Report"
          onPress={() => this.props.navigation.navigate('Reports')}
        />
      </View>
    );
  }
}

class Reports extends React.Component {
  render() {
    return (
      
        <View style= {{justifyContent: 'center', alignItems: 'center'}}>
        <Text>How do you feel? </Text>
        <Button
          title="Nausea"
          onPress={() => this.props.navigation.navigate('HomeScreen')}
        />
      </View>

    );
  }
}

export default TabNavigator({
  Home: { screen: HomeScreen },
  Reports: { screen: Reports },
 },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Reports') {
          iconName = `ios-filing${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);