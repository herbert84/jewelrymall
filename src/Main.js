/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import { Root, Icon } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';


// Our custom files and classes import
import Home from './page/Home';
import Search from './page/Search';
import Cart from './page/Cart';
import WishList from './page/WishList';
import Map from './page/Map';
import Newsletter from './page/Newsletter';
import Contact from './page/Contact';
import Category from './page/Category';
import RedstoneCategory from './page/RedstoneCategory';
import Product from './page/Product';
import ImageGallery from './page/ImageGallery';
import Login from './page/Login';
import Signup from './page/Signup';
import Checkout from './page/Checkout';
import TabIcon from './component/TabIcon';

export default class Main extends Component {
  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return(
      <SafeAreaView style={styles.safeArea}>
        <Root>
          <Router>
            <Scene key="root" hideNavBar>
              <Scene initial key="login" component={Login} hideNavBar />
              <Scene key="tabbar" tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBarStyle} tabStyle={styles.tabStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                <Scene key="home" tabBarLabel="逛" title="逛" icon={TabIcon} component={Home} hideNavBar />
                <Scene key="redstone" tabBarLabel="红宝石" title="红宝石" icon={TabIcon} component={RedstoneCategory} hideNavBar />
                <Scene key="bluestone" tabBarLabel="蓝宝石" title="蓝宝石" icon={TabIcon} component={Category} hideNavBar />
                <Scene key="emerald" tabBarLabel="祖母绿" title="祖母绿" icon={TabIcon} component={Category} hideNavBar />
                <Scene key="jade" tabBarLabel="玉石" title="玉石" icon={TabIcon} component={Category} hideNavBar />
              </Scene>
              <Scene key="search" component={Search} modal hideNavBar />
              <Scene key="cart" component={Cart} modal hideNavBar />
              <Scene key="wishlist" component={WishList} modal hideNavBar />
              <Scene key="map" component={Map} modal hideNavBar />
              <Scene key="contact" component={Contact} modal hideNavBar />
              <Scene key="newsletter" component={Newsletter} modal hideNavBar />
              <Scene key="product" component={Product} hideNavBar />
              <Scene key="imageGallery" component={ImageGallery} modal hideNavBar />
              <Scene key="signup" component={Signup} hideNavBar />
              <Scene key="checkout" component={Checkout} hideNavBar />
            </Scene>
          </Router>
        </Root>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  tabBarStyle: {
    height:32
  },
  tabStyle: {
    marginTop:5,
    height:50
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#fff'
  },
  titleStyle: {
    color: '#fff'
  }
})
