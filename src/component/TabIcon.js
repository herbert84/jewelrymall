import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: ''
};

let iconRender =(title)=>{
	switch(title){
		case '逛': return (<Icon type="FontAwesome" name="home" />);break;
		case '红宝石': return (<Icon type="FontAwesome" name="home" />);break;
		case '蓝宝石': return (<Icon type="FontAwesome" name="home" />);break;
		case '祖母绿': return (<Icon type="FontAwesome" name="plus" />);break;
		case '玉石': return (<Icon type="FontAwesome" name="play" />);break;
		default: return (<Icon type="FontAwesome" name="home" />);break;
	}
}
const TabIcon = props => (
	<View>
		{iconRender(props.title)}
	</View>
);

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;