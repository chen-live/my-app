export default [
  /**
   * @eventBus
   * 组件之间进行传参
   */
  {
    path: '/eventBus',
    name: 'eventBus',
    component: () => import("./eventbus/eventBus"),
    // redirect:"/eventBus",
    children: [
      {
        path: 'eventBusDecrement',
        component: function (resolve) {
          require(['./eventbus/children/decrement'], resolve)
        }
      },
      {
        path: 'eventBusIncrement',
        component: function (resolve) {
          require(['./eventbus/children/increment'], resolve)
        }
      },
    ]
  },
  /**
   * @attrs
   * @listeners
   */
  {
    path:"/attrsListeners",
    name:"attrsListerners",
    component:()=>import("./eventbus/attrsListeners/demo1"),
    children:[
      {
        path:'attrsListenersdemo2',
        name:'attrsListenersdemo2',
        component:()=>import("./eventbus/attrsListeners/demo2"),
        children:[
          {
            path:'attrsListenersdemo3',
            name:'attrsListenersdemo3',
            component:()=>import("./eventbus/attrsListeners/demo3"),
          }
        ]
      }
    ]
  }
] 