/**
* This is the Side Menu Drawer Component
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Drawer from 'react-native-drawer';


// Our custom files and classes import
import SideMenu from './SideMenu';


export default class FilterDrawer extends Component {
  render() {
    return(
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<SideMenu />}
        side="right"
        tapToClose={true}
        type="overlay"
        styles={drawerStyles}
        openDrawerOffset={0.3}
        onCloseStart={() => Keyboard.dismiss()}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
          {this.props.children}
      </Drawer>
    );
  }

  close() {
    this._drawer.close();
  }

  open() {
    this._drawer.open();
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#CD7F32', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}