import React from 'react';
import { Route , IndexRoute } from 'react-router';

import App from './components/app';
import Home from  './components/main/home';
import JsonViewer from  './components/main/jsonViewer';


export default (
<Route path="/" component={App} >
	<IndexRoute component={JsonViewer} />
	<Route path="search" component={JsonViewer} />
	<Route path="home" component={JsonViewer} />
</Route>
);
