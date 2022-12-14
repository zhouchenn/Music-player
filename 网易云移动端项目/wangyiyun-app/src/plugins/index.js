//vant组件集中管理
import { Swipe, SwipeItem,Button,Popup  } from 'vant';
// 放入数组中
let plugins=[
    Swipe,SwipeItem,Button,Popup 
]
//循环遍历暴露出getVant app.use(item)
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}
