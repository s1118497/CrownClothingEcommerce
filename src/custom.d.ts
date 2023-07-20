// 聲明一個模塊module
// 		這個module的extension為 ".svg"
// 	這個語法告訴 TypeScript 編譯器，
// 		當引入 .svg 文件時，需要按照下面的代碼進行處理。
declare module "*.svg" {
	import React = require("react"); //commonJS import

	// 分別暴露 a ReactComponent type for TS compiler to recognize, that used in any ".svg" file import
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

	// 將 src 常量(type string) 作為默認導出
	//	 這個語法告訴 TypeScript 編譯器，
	// 		表示在導入該模塊時，(.tsconfig.json中 include = 指定webpack打包時引入此模塊? )
	// 			可以直接使用 import svg from 'path/to/svg-file.svg',
	//				來獲取 svg 文件打包後的path (/static/media/shopping-bag.a688874f6f1507316bdfa420328a4a53.svg),
	// 				type為string
	// 			也可以使用 import {ReactComponent} from 'path/to/svg-file.svg',
	// 				以組件形式引入 svg 文件, type為React.FunctionalComponent (React.FC)
	//https://ithelp.ithome.com.tw/articles/10296704?sc=rss.iron

	const src: string;
	export default src;
}
