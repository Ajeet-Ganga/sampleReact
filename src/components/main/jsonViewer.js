import React, {	Component ,PropTypes} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import _ from 'lodash';
import Datetime from 'react-datetime';
import moment from 'moment';
import ReactJson from 'react-json-view'

import { getJson } from '../../actions/index';

import { Register_Constatnt} from '../shared/ui_constants';

class JsonViewer extends Component {


	static contextTypes = {
		router : PropTypes.object
	}

	componentWillMount(){

		var pathname=window.location.pathname;

		var attributeName = 'firstName';
		var attributeValue = '';
		var resultCount = 1;
		var rootOnly=false;
		var startDate=moment();
	  var endDate=moment();
		var jsonQuery='';
		var executeOnLoad = false;

		if(pathname=='/search'){
			var search=window.location.search;
			search=search.substring(1);

			var params = search.split('&');

			for(var count=0;count<params.length;count++){
				  executeOnLoad = true;
				  var keyvalue = params[count].split('=');
				  keyvalue[1] = decodeURIComponent(keyvalue[1]);
				  if(keyvalue[0] == 'attributeName') {
				  		attributeName = keyvalue[1];
				  }
				  if(keyvalue[0] == 'attributeValue') {
				  		attributeValue = keyvalue[1];
				  }
				  if(keyvalue[0] == 'resultCount') {
				  		resultCount = +keyvalue[1];
				  }
				  if(keyvalue[0] == 'rootOnly') {
				  		rootOnly = keyvalue[1] == 'true';
				  }
				  if(keyvalue[0] == 'startDate') {
				  		startDate = keyvalue[1];
				  }
				  if(keyvalue[0] == 'endDate') {
				  		endDate = keyvalue[1];
				  }
				  if(keyvalue[0] == 'jsonQuery') {
				  		jsonQuery = keyvalue[1];
				  }

			}

		}		

		this.state={
			'attributeName':attributeName,
			'attributeValue':attributeValue,
			'resultCount':resultCount,
			'rootOnly':rootOnly,
			'startDate':startDate,
			'endDate':endDate,
			'jsonQuery':jsonQuery,
			'methodCallBy':'attribute',
			'isStartDateOpen':false,
			'isEndDateOpen':false

		}

		if(executeOnLoad){
			this.onSerachClick();
		}
	}

	onDropdownSelect(event){
		var key = event.target.getAttribute('data');
    var value = event.target.text;
    var selectedKey=event.target.getAttribute('keyType');
    var selectedKeyValue=event.target.getAttribute('value');


    this.setState({
       [key]:value,
       [selectedKey]:selectedKeyValue
    });
	}

	onAttributeValueChange(event){
		this.setState({'attributeValue':event.target.value});
	}

	onQueryChange(event){
		this.setState({'jsonQuery':event.target.value});
	}

	onResultCountChange(event){

		var resultCount=event.target.value;	

		if(!isNaN(resultCount) && resultCount>=0){
		    
		  this.setState({'resultCount':parseInt(resultCount)});
		}		
	}

	validateForm(formData,methodCallBy){

		var errorMsg = '';
		var isValid=true;
		
		if(methodCallBy=='attribute'){
			if(formData.attributeName == 'Attributes'){
				errorMsg = (errorMsg?errorMsg+' &':'') + ' Attribute';
				isValid=false;
			}
			if(formData.resultCount <=0){
				errorMsg = (errorMsg?errorMsg+' &':'') + ' Count';
				isValid=false;
			}
		}

		if(methodCallBy=='jsonQuery'){
			if(formData.jsonQuery == ''){
				errorMsg = (errorMsg?errorMsg+' &':'') + ' jsonQuery';
				isValid=false;
			}
			
		}

		if(errorMsg){
			this.setState({'error':'Please add valid input for '+errorMsg});
			
		}

		return isValid;
	}

	onSerachClick(){

		var methodCallBy=this.state.methodCallBy;

		var formData={
			'attributeName':this.state.attributeName,
			'attributeValue':this.state.attributeValue,
			'resultCount':this.state.resultCount,
			'rootOnly':this.state.rootOnly,
			'startDate':this.state.startDate,
			'endDate':this.state.endDate		
		}

		if(methodCallBy=='jsonQuery'){

			formData={
				'jsonQuery':this.state.jsonQuery,
				'resultCount':this.state.resultCount,
				'rootOnly':this.state.rootOnly,
				'startDate':this.state.startDate,
				'endDate':this.state.endDate		
			}

		}

		var startDate=moment(formData.startDate).format("MM/DD/YYYY, h:mm a").toString();
		var endDate=moment(formData.endDate).format("MM/DD/YYYY, h:mm a").toString();

		formData={...formData,'startDate':startDate,'endDate':endDate};

		this.props.getJson(formData);

		var queryStr =	Object.keys(formData).map(function(key){ 
		  return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]); 
		}).join('&');

		browserHistory.push('/search?'+queryStr)

	}
	
	renderAttributeList(){
		return Register_Constatnt.attributesList.map( (attribute,index) => {                                  
              return( 
              	<li key={index}
                    value={attribute.value} >
                  <a onClick={this.onDropdownSelect.bind(this)} 
                  		data="attributeName" href="javascript:void(0)">
                  		{attribute.label}
                  </a>
                </li>
              )
          });
  }

  renderErrorMessage(){
    if(this.state.error){
			return	<div className="alert alert-danger alert-fixed" role="alert">{this.state.error}</div>
		}
	}

	onChkBoxSelect(chkBoxName){

    this.setState({[chkBoxName]:!this.state[chkBoxName]});
  }

  onStartDateChange(startDate){

  	this.setState({'startDate':startDate})
  }

  onEndDateChange(endDate){
  	this.setState({'endDate':endDate})
  }    

  renderResultPanel(){
  	if(this.props.jsonResult){
  		return(

  			<div className="clearfix wizard-form-section panel panel-default margin20-top">
							<div className="panel-heading">
								<span className="heading heading-primary">
								Result
								</span>
							</div>


							<div className="panel-body" >
								<div className="row static-block">

								 	 <ReactJson name={false} src={this.props.jsonResult} />
															
								</div>							
								
							</div>
						</div>		
  		)
  	}
  }

  renderCommonFields(){
  	return(
  		<div>
  			<div className="row static-block">

					<div className="col-md-3 col-sm-12 col-xs-12">
						<div className="form-group custome">
							<label>Result Count</label>
							<input value={this.state.resultCount} onChange={this.onResultCountChange.bind(this)} type="number" className="form-control" placeholder="Enter Count"/>
						</div>
					</div>								
											
				</div>

				<div className="checkbox margin15-bottom">
				<label>
				<input type="checkbox" 
						onChange={this.onChkBoxSelect.bind(this,'rootOnly')} 
						checked={this.state.rootOnly}/>
						Show only root request response
				</label>
				</div>

				<div className="row static-block">

					<div className="col-md-4 col-sm-12 col-xs-12">
						<div className="form-group custome">
									<label>Start Date </label>
			            <Datetime defaultValue={this.state.startDate} closeOnSelect={true} 
			            					 disableOnClickOutside={false} ref='isStartDateOpen' open={this.state.isStartDateOpen}
															onChange={this.onStartDateChange.bind(this)}/>			            
			     												
						</div>
					</div>	

					<div className="col-md-4 col-sm-12 col-xs-12">
						<div className="form-group custome">
							<label>End Date </label>
			            <Datetime defaultValue={this.state.endDate} closeOnSelect={true}
			            					 disableOnClickOutside={false} ref='isEndDateOpen' open={this.state.isEndDateOpen}
														onChange={this.onEndDateChange.bind(this)}/>			            
			 
						</div>
					</div>							
											
				</div>
		
				<div className="clearfix">
					<div className="text-center margin20-top">
						<button onClick={this.onSerachClick.bind(this)} className="btn btn-primary">Search</button>							
					</div>
				</div>
  		</div>
  	)
  }

  onTabSelect(type){
  	this.setState({'methodCallBy':type});
  	this.props.getJson(false);

	

		browserHistory.push('/')
  }

	render() {

		return(    

				<div className="right-sidebar" style={{'overflowY':'scroll'}} >

					
					<div className="clearfix col-md-10 col-md-offset-1 col-sm-12 col-xs-12"  >
						{this.renderErrorMessage()}

						<div className="clearfix wizard-form-section panel panel-default margin20-top" style={{'marginTop':'40px'}} >

						<ul className="nav nav-tabs" style={{'paddingLeft': '20px','paddingTop': '10px'}}>
						  <li onClick={this.onTabSelect.bind(this,'attribute')} className="active"><a data-toggle="tab" href="#home" style={{'fontSize':'15px'}}>Attribute Search</a></li>
						  <li onClick={this.onTabSelect.bind(this,'jsonQuery')}><a data-toggle="tab" href="#menu1" style={{'fontSize':'15px'}}>Json Search</a></li>					  
						</ul>

						<div className="tab-content">
						  <div id="home" className="tab-pane fade in active">
						    <div className="panel-body" >
									<div className="row static-block">

										<div className="col-md-3 col-sm-12 col-xs-12  margin10-bottom">
										  <div className="form-group custome">
									      <label>Attribute</label>
									      <div className="clearfix">
								          <div className="dropdown fluid">
							              <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
							                  {this.state.attributeName}
							                  <i className="icon lh-caret-up-down"></i>
							              </button>
							              <ul className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenu1">
																{ this.renderAttributeList() }
							              </ul>
								          </div>
									      </div>
										  </div>
										</div>

										<div className="col-md-5 col-sm-12 col-xs-12">
											<div className="form-group custome">
												<label>Value</label>
												<input value={this.state.attributeValue} 
															onChange={this.onAttributeValueChange.bind(this)} 
															type="text" className="form-control" placeholder="Enter Value"/>
											</div>
										</div>								
																
									</div>

									{ this.renderCommonFields()}
									
								</div>
						  </div>

						  <div id="menu1" className="tab-pane fade">
						  	<div className="panel-body" >
						    	<div className="row static-block">
										<div className="col-md-6 col-sm-12 col-xs-12">
											<div className="form-group custome">
												<label>Json Query</label>
												<textarea value={this.state.jsonQuery} rows="4" 
													style={{'height':'100px'}}
															onChange={this.onQueryChange.bind(this)} 
															 placeholder="Enter query"  className="form-control"/>
											</div>
										</div>															
									</div>

									{ this.renderCommonFields()}
								</div>
						  </div>
						
						</div>							
						</div>	

						{ this.renderResultPanel()}									
						
					</div>					
					 
				</div>  
		
		)
	}
}

function mapStateToProps(state){
	return ({
		jsonResult:state.app.jsonResult
	});
}

export default connect(mapStateToProps ,{getJson})(JsonViewer);
