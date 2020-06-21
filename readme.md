# GridMap.js

这是一个能够在html页面上画网格图的小玩具。

## 介绍

该组件是基于canvcas的网格图绘制小工具，目前实现了基础的绘制功能，可以快速的绘制出你想要的网格图。后续会逐步完善该组件。

## 基础使用

可以在example.html看到一个完整的样例。

### 导入方式

#### es6+
`import {GridMap} from "./src/GridMap.js"
`

#### es5
    es5有已经打包好的代码可以直接使用
`<script src="./dist/GridMap.js"><script>
`

    如果想自己打包的话只需要在根目录输入
```
npm install
npm run build
```

### 使用方式
    您需要提前定义好一个有着宽高的div元素来装载网格图
```
var map = document.getElementById("map")
var gc = GridMap.init(map)  // 初始化
gc.addMap(mapinfo)  // 增加地图信息
gc.refresh()    // 刷新地图
```

## 基本定义组件
    只要按照规则定义组件，网格图就可以按照你的想法去绘制图形，我们是通过gridController去控制这些组件。
---
### GridController
    全局Grid控制体，他提供基础的控制操作。

#### 方法列表

> addMap(mapinfo) / removeMap(id)：见下面Map组件

> addItems(itemsInfo) / removeItem(id)：见下面Item组件

> refresh()：刷新地图，地图在增加删除信息的时候不会主动的重新绘制，调用refresh在尼想要刷新地图的时候进行刷新。

> showGrid(size) / hiddenGrid()：展示出网格，如果不输入size，会按照默认或者你上一次showGrid传入的size进行网格绘制。

---
### Map

    地图信息需要在调用addMap被传入，他的结构如下:
```
        mapInfo = [
            {
                "position": "200,300",
                "size": "20,20",
                "image": null,
                "collision": true,
                "id": "map_001"
            },
            {
                "position": "50,50",
                "size": "20,20",
                "image": null,
                "collision": true,
                "id": "map_002"
            }
        ]
```
    下面是参数的含义：
> position：代表着左上角的坐标，需要传入x,y。

> size: 代表着方格大小，需要传入x,y

> color：方块的颜色，请务必使用十六进制的颜色表来表示颜色。例如：#ff0000

> image: 可以使用图片代替方格，需要传入Image对象。如果传入了Image对象color会失效。

> collision：是否可以被碰撞，是的话在移动的时候无法与别的物体重叠

> id：唯一标识，对于map是可以不设定的选项，可以通过该标识去使用removeMap(id)去删除该地图块。
---
### Item
    Item代表着地图的非地图块元素，但是实质上与Map区别不大，需要用addItems添加，他的结构与Map一致。

```
[{
    "position": "200, 300",
    "size": "50, 50",
    "image": image,
    "id": 'character'
}]
```
    Item与Map有两点区别：
>collision：如果不填的话Item默认是true的，Map则是false。

> id：对于Item来说，id基本上是必填项。
---
### Camera
    该模块是摄像机模块，用于定位当前我们的视觉中心，从而能展示出我们所能看到的地图信息。

#### 方法列表

> get/setPos：用于设置摄像机x,y坐标值

> get/setScale：用于设置摄像机的缩放值，1:Xpx

> set/get[Min/Max]Scle：设置最大，最小缩放值

> set/getScaleRate：设置缩放速度

> setFocus(id)：传入已有的Item id，可以让摄像机跟随该物体。
---
### Ext
这个模块主要是一些Extension，所以里面的功能都是一些与地图本身没太大关系的功能

#### 功能列表

> moveItem(itemid, x, y, isRelative)：该功能让Item id直接移动到对应的x, y位置。如果isRelative是true，他是相对自身本身的坐标移动x,y大小的位置，否则是直接到达x,y坐标
---

## Options

在我们初始化的时候init需要传入div，也可以传入Options来改变默认的参数。我们拥有以下的默认参数：
```
options = {
    "FullScreen": true,  
    "Scale": true,
    "boxColor": "#FFFF99",
    "collision": true,
    "needGrid": false,
    "GridSize": 200, 
}
```

> FullScreen：是否开启双击全屏展示功能

> Scale：是否开启通过鼠标滚轮缩放功能

> boxColor：默认的Map color

> collision：是否开启碰撞检测

> needGrid：是否需要网格，可以通过controller直接修改

> GridSize：网格间距
---
