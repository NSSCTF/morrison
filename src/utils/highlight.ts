// import Hljs from 'highlight.js';
// import 'highlight.js/styles/tomorrow-night.css'; // 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件
import Prism from 'prismjs'

let Highlight = {install: function (Vue: any) {
    // 自定义指令 v-highlight
    Vue.directive('highlight', function(el: any) {
        let blocks = el.querySelectorAll('pre code');
        for (let i = 0; i < blocks.length; i++) {
            // Hljs.highlightBlock(blocks[i]);
            Prism.highlightElement(blocks[i]);
        }
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].innerHTML = "<ol><li>" + blocks[i].innerHTML.replace(/\n/g, "\n</li><li>") + "\n</li></ol>"
        }
            // html("<ol><li>" + $(this).html().replace(/\n/g,"\n</li><li>") +"\n</li></ol>");
        },
    //     // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    //     componentUpdated: function(el: any) {
    //         let blocks = el.querySelectorAll('pre code');
    //         for (let i = 0; i < blocks.length; i++) {
    //             Hljs.highlightBlock(blocks[i]);
    //         }
    //         for (let i = 0; i < blocks.length; i++) {
    //             blocks[i].innerHTML = "<ol><li>" + blocks[i].innerHTML.replace(/\n/g, "\n</li><li>") + "\n</li></ol>"
    //         }
    //         console.log(2)
    //     }
    // }
    )
}};

export default Highlight;