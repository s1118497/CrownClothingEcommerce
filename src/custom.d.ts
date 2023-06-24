// 聲明一個模塊module
// 		這個module的extension為 ".svg"
// 	這個語法告訴 TypeScript 編譯器，
// 		當遇到 .png 文件時，需要按照下面的代碼進行處理。
declare module "*.svg" {
	import React = require("react"); //commonJS import

	// export a ReactComponent type for TS compiler to recognize, that used in any ".svg" file import
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

	// 將 src 常量作為默認導出
	//	 這個語法告訴 TypeScript 編譯器，
	// 		當其他文件導入這個模塊時,將默認導出的值賦值給變量
	// 		(.tsconfig.json中 include = 指定webpack打包時導入此模塊? )
	const src: string;
	export default src;
}
