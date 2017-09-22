import React, {	Component ,PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';


class Home extends Component {


	static contextTypes = {
		router : PropTypes.object
	}

	componentWillMount(){

	}

	render() {

	return(    

		<div></div>	
	)
	}
}

function mapStateToProps(state){

	return ({
		allData:state.app.allData
	});
}

export default connect(mapStateToProps ,null)(Home);
