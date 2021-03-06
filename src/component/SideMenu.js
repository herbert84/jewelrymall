/**
* This is the SideMenu component used in the navbar
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, Linking } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Icon, Item, Input, Button, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import SideMenuSecondLevel from './SideMenuSecondLevel';
import Text from './Text';

export default class SideMenu extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loginUserContactName:"",
        search: "",
        searchError: false,
        subMenu: false,
        subMenuItems: [],
        clickedItem: ''
      };

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  componentDidMount() {
    global.storage.load({
            key: 'jewelrymall',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
          this.setState({
            loginUserContactName: ret.loginUserContactName
          })
      }).catch(err => {
        console.warn(err.message);
    });
  }
  render() {
    return(
          <ScrollView style={styles.container}>
              {this.renderMenu()}
          </ScrollView>
    );
  }

  renderMenu() {
    if(!this.state.subMenu) {
      return(
        <View>
          <View style={{marginTop: 20,marginBottom: 15, paddingLeft: 15}}>
            <Text style={{fontSize:20}}>欢迎您:{this.state.loginUserContactName}</Text>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15}}>
            <List>
              {this.renderSecondaryList()}
              <ListItem
                icon
                key={0}
                button={true}
                onPress={() => {
                  Actions.login()
                }}
              >
                <Left>
                  <Icon style={{fontSize: 18}} name="ios-log-out" />
                </Left>
                <Body style={{marginLeft: -15}}>
                  <Text style={{fontSize: 16}}>登出</Text>
                </Body>
              </ListItem>
            </List>
          </View>
        </View>
      );
    }
    else {
      return(
        <SideMenuSecondLevel back={this.back.bind(this)} title={this.state.clickedItem} menu={this.state.subMenuItems} />
      );
    }
  }

  renderMenuItems() {
    let items = [];
    menuItems.map((item, i) => {
      items.push(
        <ListItem
          last={menuItems.length === i+1}
          icon
          key={item.id}
          button={true}
          onPress={() => this.itemClicked(item)}
        >
          <Body>
            <Text>{item.title}</Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  itemClicked(item) {
    if(!item.subMenu || item.subMenu.length<=0) {
      Actions.category({id: item.id, title: item.title});
      return;
    }
    var animationConfig = {
        duration: 150,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: true, subMenuItems: item.subMenu, clickedItem: item.title});
  }

  back() {
    var animationConfig = {
        duration: 150,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: false, subMenuItems: [], clickedItem: ''})
  }

  search(text) {
    if(this.state.search.length <= 2)
      this.setState({searchError: true, search: ""});
    else
      Actions.search({searchText: this.state.search});
  }

  renderSecondaryList() {
    let secondaryItems = [];
    menusSecondaryItems.map((item, i) => {
      secondaryItems.push(
        <ListItem
          last
          icon
          key={item.id}
          button={true}
          onPress={Actions[item.key]}
        >
          <Left>
            <Icon style={{fontSize: 18}} name={item.icon} />
          </Left>
          <Body style={{marginLeft: -15}}>
            <Text style={{fontSize: 16}}>{item.title}</Text>
          </Body>
        </ListItem>
      );
    });
    return secondaryItems;
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  }
};

var menuItems = [
  {
    id: 1,
    title: '红宝石'
  },
  {
    id: 2,
    title: '蓝宝石'
  },
  {
    id: 3,
    title: '祖母绿'
  },
  {
    id: 4,
    title: '白钻'
  }
];


const menusSecondaryItems = [
  {
    id: 19,
    title: '我的订单',
    icon: 'heart',
    key: 'orderlist'
  },
  {
    id: 20,
    key: 'myinfo',
    title: '我的信息',
    icon: 'md-phone-portrait'
  },
  {
    id:21,
    key:'changePwd',
    title: '更换密码',
    icon: 'md-phone-portrait'
  }
];
