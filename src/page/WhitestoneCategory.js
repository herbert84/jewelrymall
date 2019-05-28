/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, RefreshControl, FlatList, ActivityIndicator} from 'react-native';
import { Container, Content, View, Left, Right, Button, Icon, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Config from '../utils/Config';
// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import FilterDrawer from '../component/FilterDrawer';
import Product from '../component/Product';

export default class WhitestoneCategory extends Component {
  constructor(props) {
      super(props);
      this.pageNo = 0;
      this.state = {
        items: [],
        selectedTab: 0,
        refreshing: false,
        showFoot:0,
        totalPage:0,
        size:4,
        loading:false,
        error: false
      };
  }

  componentWillMount() {
    this.getProducts(0);
  }
  _onRefresh = () => {
    this.setState({
      error:false,
      items:[],
      showFoot:0
    });
    this.pageNo = 0;
    this.getProducts();
  }
  getProducts(){
    //this.setState({refreshing: true});
    var query ={
      "criteria": {
        "category": {
          "value": [
            "SECONDARY_WHITE"
          ]
        }
      },
      "paging": {
        "index": this.pageNo,
        "size": this.state.size
      }
    }
    axios({
      method:'POST',
      url:Config.baseDomain+'/retailer/gemstone/secondary/search',
      data:query,
      responseType:'json'
    }).then((res)=>{
      console.log(res.data);
      let foot = 0;
      if(this.pageNo+1 >= res.data.totalPages){
        foot = 1;//listView底部显示没有更多数据了
      }
      console.log("new data:"+res.data.content.length);
      var newData = this.state.items.concat(res.data.content);
      console.log("new data length:"+newData.length);
      console.log("new data, state.items:"+this.state.items.length);
      this.setState({
        items:newData,
        refreshing:false,
        isLoading: false,
        showFoot: foot,
        totalPage: res.data.totalPages
      })
    }).catch((err)=>{
      this.setState({refreshing: false});
    });
  }
  //加载等待页
  renderLoadingView() {
    return (
      <View style={styles.container}>
          <ActivityIndicator
              animating={true}
              color='red'
              size="large"
          />
      </View>
    );
  }
  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => {this._filterDrawer.close(); this._sideMenuDrawer.open()}} transparent>
          <Icon name='ios-menu-outline' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => {this._filterDrawer.close(); Actions.cart()}} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );

    return(
         <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container style={{backgroundColor: '#fdfdfd'}}>
            <Navbar left={left} right={right} title={this.props.title} />
            {this.renderTopFilter()}
            <FilterDrawer ref={(ref) => this._filterDrawer = ref}>
              {this.renderList()}
            </FilterDrawer>
          </Container>
          </SideMenuDrawer>
    );
  }
  renderTopFilter(){
    return (<View style={{ height:40, flexDirection:'row', justifyContent: 'space-around'}}>
        <View style={this.state.selectedTab === 0 ? styles.tabSelected:styles.tabUnSelected}>
          <Button transparent onPress={()=>{this.setState({selectedTab: 0});this._filterDrawer.close()}}>
            <Text>成品</Text>
          </Button>
        </View>
        <View style={this.state.selectedTab === 1 ? styles.tabSelected:styles.tabUnSelected}>
          <Button transparent onPress={()=>{this.setState({selectedTab: 1}); this._filterDrawer.close()}}>
            <Text>裸石</Text>
          </Button>
        </View>
        <View>
          <Button onPress={() => {this._sideMenuDrawer.close();this._filterDrawer.open()}} transparent style={styles.tabUnSelected}>
            <Text>筛选</Text>
          </Button>
        </View></View>);
  }
  _renderFooter(){
    if (this.state.showFoot === 1) {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    } else if(this.state.showFoot === 2) {
        return (
            <View style={styles.footer}>
                <ActivityIndicator />
                <Text>正在加载更多数据...</Text>
            </View>
        );
    } else if(this.state.showFoot === 0){
        return (
            <View style={styles.footer}>
                <Text></Text>
            </View>
        );
    }
  }
  //返回itemView
  _renderItemView({item}) {
    return (
        <Product key={item.id} product={item} />
    );
  }
  renderList(){
    if (this.state.isLoading && !this.state.error) {
        return this.renderLoadingView();
    } else if (this.state.error) {
        //请求失败view
        return this.renderErrorView();
    }
    return (
      <FlatList
        numColumns={2}
        data={this.state.items}
        renderItem={this._renderItemView}
        ListFooterComponent={this._renderFooter.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold={1}
        onRefresh={() => this._onRefresh()}
        refreshing={this.state.refreshing}
      />
    );
  }
  //加载失败view
  renderErrorView() {
    return (
      <View style={styles.container}>
          <Text>
              加载失败，请重试
          </Text>
      </View>
    );
  }
  _onEndReached(){
      console.log("new data:"+this.state.showFoot+"/"+this.pageNo+"/"+this.state.totalPage)
        //如果是正在加载中或没有更多数据了，则返回
      if(this.state.showFoot != 0 ){
          return ;
      }
      //如果当前页大于或等于总页数，那就是到最后一页了，返回
      if((this.pageNo!=1) && (this.pageNo>=this.state.totalPage)){
          return;
      } else {
          this.pageNo++;
      }
      //底部显示正在加载更多数据
      this.setState({showFoot:2});
      //获取数据
      this.getProducts();
  }
}
const styles = {
  tabUnSelected:{
    width: 100,
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  tabSelected: {
    width: 100, 
    borderBottomWidth: 2, 
    flexDirection: 'row', 
    borderBottomColor: 'blue',
    justifyContent: 'center'
  }
}
