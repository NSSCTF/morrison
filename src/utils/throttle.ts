// import { proxyRefs } from "vue";

// const throttle = function throttle(func: Function, wait: number) {
//     if (typeof func !== "function") throw new TypeError("func must be a function");
//     if (isNaN(wait)) wait = 1000;
//     let timer: undefined | number = undefined, previous = 0, result: any;
//     return function proxy(...params: any[]) {
//         let now = +new Date;
//         let remaining = wait - (now - previous);
//         let self: any = this;

//         if (remaining <= 0) {
//             if (timer) {
//                 clearTimeout(timer);
//                 timer = undefined;
//             }
//             previous = now;
//             result = func.apply(this, params);
//             return result;
//         }
//         if (!timer) {
//             timer = setTimeout(() => {
//                 clearTimeout(timer);
//                 timer = undefined;
//                 previous = +new Date;
//                 result = func.apply(self, params);
//             }, remaining);
//         }
//         return result;

//     }
// }