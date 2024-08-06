import dayjs from 'dayjs';

import {
	Box,
	Boxes,
	CalendarCheck2,
	// Check,
	// ChevronDown,
	// ChevronUp,
	ListChecks,
	Users,
	type Icon
} from 'lucide-svelte';
import { type ComponentType } from 'svelte';
// import type {Icon} from "lucide-svelte"

type GfNav = {
	name: string;
	url: string;
	icon: ComponentType<Icon>;
};

export const gfnav: GfNav[] = [
	{ name: 'Items', url: '/item', icon: Box },
	{ name: 'Tasks', url: '/task', icon: CalendarCheck2 },
	{ name: 'Actions', url: '/action', icon: ListChecks },
	{ name: 'Users', url: '/user', icon: Users },
	{ name: 'Inventory', url: '/inventory', icon: Boxes }
];

export async function handleEditorContentAndImages(html: string, maxSize = 1024) {
	const template = document.createElement('template');
	template.innerHTML = html;
	const imgs = template.content.querySelectorAll('img');

	const formData = new FormData();
	for (let i = 0; i < imgs.length; i++) {
		const img = imgs[i];
		if (!img.dataset.handled) {
			// console.log('jg1');
			// img.setAttribute('crossOrigin', 'anonymous');

			// const jgimg = await jg2(img);
			// const blob = await jg3(jgimg);
			// console.log('jg3', jgimg.width);
			const blob = await imgFetchBlob(img.src);
			const b2 = await resizeToBlobJPG(blob, { maxSize });
			const time = dayjs(Date.now()).format('YYYYMMDD[T]HHmmssSSS');
			formData.append('file', b2, `${time}-${i}`);
			img.src = `/images/${time}-${i}.jpg`;
			img.dataset.handled = '1';
		}
	}
	return { formData, html: template.innerHTML };
}
export async function fetchAndConvertImgToBase64(src: string, maxSize = 200) {
	const blob = await imgFetchBlob(src);
	// console.log('vloob1', blob);
	const url = await resizeToBase64PNG(blob, { maxSize });
	// console.log('vloob', url);
	return url;
}
function imgFetchBlob(src: string): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const blob = fetch(src).then((res) => res.blob());
		resolve(blob);
	});
}
function jg(img: HTMLImageElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext('2d');
		ctx!.drawImage(img, 0, 0, img.width, img.height);
		canvas.toBlob((blob) => {
			resolve(blob!);
		});
	});
}
function jg2(img: HTMLImageElement, options = { maxSize: 1024 }): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const i = new Image();
		i.src = img.src;
		i.onload = function () {
			resolve(i);
		};
	});
}
function jg3(img: HTMLImageElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext('2d');
		ctx!.drawImage(img, 0, 0, img.width, img.height);
		canvas.toBlob((blob) => {
			resolve(blob!);
		});
	});
}

function resizeToBlobJPG(blob: Blob, options = { maxSize: 1024 }): Promise<typeof blob> {
	return new Promise((resolve, reject) => {
		createImageBitmap(blob).then((i) => {
			let width = i.width;
			let height = i.height;
			const max = options.maxSize;
			if (width > max || height > max || !(blob.type == 'image/jpeg')) {
				if (width > height) {
					width = width > max ? max : width;
					height = Math.floor(height * (width / i.width));
				} else {
					height = height > max ? max : height;
					width = Math.floor(width * (height / i.height));
				}
				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext('2d');
				ctx!.drawImage(i, 0, 0, width, height);
				canvas.toBlob(
					(blob) => {
						resolve(blob!);
					},
					'image/jpeg',
					0.7
				);
			} else resolve(blob);
		});
	});
}
function resizeToBase64PNG(blob: Blob, options = { maxSize: 200 }): Promise<string> {
	return new Promise((resolve, reject) => {
		createImageBitmap(blob).then((i) => {
			let width = i.width;
			let height = i.height;
			const max = options.maxSize;
			if (width > height) {
				width = width > max ? max : width;
				height = Math.floor(height * (width / i.width));
			} else {
				height = height > max ? max : height;
				width = Math.floor(width * (height / i.height));
			}
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			ctx!.drawImage(i, 0, 0, width, height);
			const url = canvas.toDataURL('image/png');
			console.log('vloob22', url);

			resolve(url);
		});
	});
}

export async function handleEditorImages(html: string, maxSize = 1024) {
	const div = document.createElement('div');
	div.innerHTML = html;
	const imgs = div.getElementsByTagName('img');

	for (let i = 0; i < imgs.length; i++) {
		const img = imgs[i];
		const blob = await imgFetchBlob(img);
		img.src = await handleImg(blob, { maxSize });
	}
	// console.log('ss2');
	return div.innerHTML;
}

function handleImg(blob: Blob, options = { maxSize: 1024 }): Promise<string> {
	return new Promise((resolve, reject) => {
		// img.src = src;
		const i = new Image();
		i.src = URL.createObjectURL(blob);
		i.onload = function () {
			let width = i.width;
			let height = i.height;
			const max = options.maxSize;
			// console.log('maxx', max);

			// console.log('aa3', width, height);
			if (width > height) {
				width = width > max ? max : width;
				height = Math.floor(height * (width / i.width));
			} else {
				height = height > max ? max : height;
				width = Math.floor(width * (height / i.height));
			}
			// let canvas = document.getElementById('aa');
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			ctx!.drawImage(i, 0, 0, width, height);
			const src = canvas.toDataURL('image/jpeg', 0.7);
			resolve(src);
		};

		// return null;
	});
}
