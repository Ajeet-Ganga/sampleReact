import React, { Component } from 'react';

import Home from '../components/main/home';

export default class App extends Component {
  render() {
    return (
    <div>
     	<Home/>
     	  <div className="clearfix LH-body">
            <div className="left-sidebar">
              <div className="clearfix title-bar">React Demo App</div>
              <div className="clearfix left-nav-menu">
               
                <a href="javascript:void(0)" className="active" >
                <i className="icon lh-search-find" style={{'marginRight':'5px','fontSize':'12px','paddingLeft':'50px'}}></i>
                <span style={{'fontSize':'15px'}}>SEARCH</span>
                </a>
            
             
                
              </div>
            </div>
          
         		 {this.props.children}

       	</div>
    </div>
				
    );
  }
}
