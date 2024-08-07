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
export const search2 = $state({ value: '', active: true });
// let double = $derived(search.value + 'doubl');
// search.double = double;

function createStore(initialValue: string) {
	let value = $state(initialValue);
	let active = $state(true);
	const cleanedValue = $derived(value.trim().toLowerCase());
	const cleanedValues = $derived(cleanedValue.split(/\s+/));
	return {
		get value() {
			return value;
		},
		set value(data) {
			value = data;
		},
		get active() {
			return active;
		},
		set active(data) {
			active = data;
		},
		get cleanedValue() {
			return cleanedValue;
		},
		get cleanedValues() {
			return cleanedValues;
		}
	};
}
export const search = createStore('');
