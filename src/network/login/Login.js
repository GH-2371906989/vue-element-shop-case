import {request} from '../request.js'

export function postLoginData(form) {
	return request({
		url: "/login",
		method: "post",
		 params: form
	});
}
