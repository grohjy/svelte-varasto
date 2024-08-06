// function createStore() {
// 	let user = $state('jeepa');
// 	return {
// 		get user() {
// 			return user;
// 		},
// 		set user(data) {
// 			user = data;
// 		}
// 	};
// }

// export const store = createStore();
export const search = $state({ value: '', active: true });
