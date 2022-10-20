<template>
  <div id="mountNode"></div>
</template>
<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      graph: {},
      data: {
        nodes: [
          {
            name: "cardNodeApp",
            id: "1",
            nodeError: false,
            dataType: "subRoot",
            minuend: "被减数",
            subtractor: "减数",
            x: 300,
            y: 50,
            children: [
              {
                name: "sub",
              },
            ],
          },
          {
            name: "cardNodeApp",
            id: "2",
            nodeError: false,
            dataType: "subRoot",
            minuend: "被减数",
            subtractor: "减数",
            x: 150,
            y: 50,
            children: [
              {
                name: "sub",
              },
            ],
          },
        ],
        // 边集
        edges: [
          {
            source: "1", // String，必须，起始点 id
            target: "2", // String，必须，目标点 id
          },
        ],
      },
    };
  },
  mounted() {
    this.initGraph();
    this.graph.data(this.data); // 读取 Step 2 中的数据源到图上
    this.graph.render(); // 渲染图
  },
  methods: {
    initGraph() {
      this.registerNode();
      this.graph = new G6.Graph({
        container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
        modes: {
          default: ["drag-node"],
        },
        defaultNode: {
          type: "minus-node",
        },
      });
    },
    registerNode() {
      //节点基础方法
      const nodeBasicMethod = {
        createNodeBox: (group, config, w, h, isRoot) => {
          /* 最外面的大矩形 */
          const container = group.addShape("rect", {
            attrs: {
              x: 0,
              y: 0,
              width: w,
              height: h,
            },
            name: "big-rect-shape",
            draggable: true,
          });
          if (!isRoot) {
            /* 左边的小圆点 */
            // group.addShape("circle", {
            //   attrs: {
            //     x: 3,
            //     y: h / 2,
            //     r: 6,
            //     fill: config.basicColor,
            //   },
            //   name: "left-dot-shape",
            // });
          }
          /* 矩形 */
          group.addShape("rect", {
            attrs: {
              x: 3,
              y: 0,
              width: w - 19,
              height: h,
              fill: config.bgColor,
              stroke: config.borderColor,
              radius: 2,
              cursor: "pointer",
            },
            draggable: true,
            name: "rect-shape",
          });

          /* 左边的粗线 */
          //   group.addShape("rect", {
          //     attrs: {
          //       x: 3,
          //       y: 0,
          //       width: 3,
          //       height: h,
          //       fill: config.basicColor,
          //       radius: 1.5,
          //     },
          //     name: "left-border-shape",
          //   });
          return container;
        },
        /* 生成树上的 marker */
        createNodeMarker: (group, collapsed, x, y) => {
          group.addShape("marker", {
            attrs: {
              x,
              y,
              r: 7,
              symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
              stroke: "rgba(0,0,0,0.25)",
              fill: "green",
              lineWidth: 1,
              cursor: "pointer",
            },
            name: "collapse-icon1",
          });
          //
          group.addShape("marker", {
            attrs: {
              x,
              y: y + 65,
              r: 7,
              symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
              stroke: "rgba(0,0,0,0.25)",
              fill: "red",
              lineWidth: 1,
              cursor: "pointer",
            },
            name: "collapse-icon2",
          });
        },
        //圆圈的操作点击事件
        afterDraw: (cfg, group) => {
          const icon1 = group.find(
            (element) => element.get("name") === "collapse-icon1"
          );
          const icon2 = group.find(
            (element) => element.get("name") === "collapse-icon2"
          );
          icon1.on("click", () => {
            console.log("click minuend");
          });
          icon2.on("click", () => {
            console.log("click subtractor");
          });
        },
        setState: (name, value, item) => {
          const hasOpacityClass = ["collapse-icon-bg"];
          const group = item.getContainer();
          const childrens = group.get("children");
          this.graph.setAutoPaint(false);
          if (name === "emptiness") {
            if (value) {
              childrens.forEach((shape) => {
                if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
                  return;
                }
                shape.attr("opacity", 0.4);
              });
            } else {
              childrens.forEach((shape) => {
                if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
                  return;
                }
                shape.attr("opacity", 1);
              });
            }
          }
          this.graph.setAutoPaint(true);
        },
      };
      //获取节点配置
      const getNodeConfig = (node) => {
        let config = {
          basicColor: "#5B8FF9",
          fontColor: "#5B8FF9",
          borderColor: "#5B8FF9",
          bgColor: "#C6E5FF",
        };
        switch (node.type) {
          case "root": {
            config = {
              basicColor: "#E3E6E8",
              fontColor: "rgba(0,0,0,0.85)",
              borderColor: "#E3E6E8",
              bgColor: "#5b8ff9",
            };
            break;
          }
          default:
            break;
        }
        return config;
      };

      const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
        return [
          ["M", x - r, y],
          ["a", r, r, 0, 1, 0, r * 2, 0],
          ["a", r, r, 0, 1, 0, -r * 2, 0],
          ["M", x - r + 4, y],
          ["L", x - r + 2 * r - 4, y],
        ];
      };

      G6.registerNode("minus-node", {
        draw(cfg, group) {
          const config = getNodeConfig(cfg);
          const isRoot = cfg.dataType === "root";
          const container = nodeBasicMethod.createNodeBox(
            group,
            config,
            243,
            64,
            isRoot
          );
          //添加文本节点被减数
          group.addShape("text", {
            attrs: {
              text: cfg.minuend,
              x: 90,
              y: 19,
              fontSize: 14,
              fontWeight: 700,
              textAlign: "left",
              textBaseline: "middle",
              fill: config.fontColor,
              cursor: "pointer",
            },
            name: "minuend",
            draggable: true,
          });
          //减数
          group.addShape("text", {
            attrs: {
              text: cfg.subtractor,
              x: 100,
              y: 45,
              fontSize: 14,
              textAlign: "left",
              textBaseline: "middle",
              fill: config.fontColor,
              cursor: "pointer",
            },
            name: "subtractor",
            draggable: true,
          });

          const hasChildren = cfg.children && cfg.children.length > 0;
          if (hasChildren) {
            nodeBasicMethod.createNodeMarker(group, cfg.collapsed, 115, 0);
          }
          return container;
        },
        afterDraw: nodeBasicMethod.afterDraw,
        setState: nodeBasicMethod.setState,
        //固定锚点
        getAnchorPoints() {
          return [
            [0.5, 0], // 左侧中间
            [0.5, 1], // 右侧中间
          ];
        },
      });
    },
  },
};
</script>
<style lang="less">
</style>
