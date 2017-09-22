import axios from 'axios';

import {jsonResult} from '../server/server';

export const GET_JSON='GET_JSON';


const API_CONFIG = {
	headers: {
		'Content-Type': 'application/json'
	}
}


export function getJson(formData){
	
	return function(dispatch) {
		
			dispatch({
				type: GET_JSON,
				data: formData ? jsonResult :null
			});
			return new Promise(function(resolve,reject){
				console.log('for suppress warning',reject);
				resolve('');
			});

		}
}

