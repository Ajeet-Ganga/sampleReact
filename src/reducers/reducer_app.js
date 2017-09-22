
import {
	GET_JSON
} from '../actions/index';


const INITIAL_STATE = {
	jsonResult:null
};

export default function(state = INITIAL_STATE, action) {

	console.log('action type ==',action.type);
	console.log('action data ==',action.data);
	
	switch (action.type) {
		case GET_JSON:
			return {...state,
				jsonResult:action.data
			}
			
		default:
			return state;
	}
}