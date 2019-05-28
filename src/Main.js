/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Root, Icon } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Storage from 'react-native-storage';

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
import BluestoneCategory from './page/BluestoneCategory';
import WhitestoneCategory from './page/WhitestoneCategory';
import GreenstoneCategory from './page/GreenstoneCategory';
import Product from './page/Product';
import ImageGallery from './page/ImageGallery';
import Login from './page/Login';
import Signup from './page/Signup';
import Checkout from './page/Checkout';
import TabIcon from './component/TabIcon';

let storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 1,//一个小时

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // sync: require('./sync')
});
// 全局变量
global.storage = storage;


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
                <Scene key="bluestone" tabBarLabel="蓝宝石" title="蓝宝石" icon={TabIcon} component={BluestoneCategory} hideNavBar />
                <Scene key="emerald" tabBarLabel="祖母绿" title="祖母绿" icon={TabIcon} component={GreenstoneCategory} hideNavBar />
                <Scene key="whitestone" tabBarLabel="白钻" title="白钻" icon={TabIcon} component={WhitestoneCategory} hideNavBar />
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
