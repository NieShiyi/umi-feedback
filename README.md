# README

## 问题
history.block的回调函数不管有没有返回值或是返回任何值，都会阻止路由跳转。按理说teturn true应该是允许正常跳转的，但是现在还是被阻止了，都无法正常跳转页面。
issue链接 https://github.com/umijs/umi/issues/10911

## 步骤
1.随便在一个页面函数中写如下代码
```
  useEffect(() => {
    const unblock = history.block(({ location }) => {
      console.log('地址被拦截', location)
      // return false
      // return "hello"
      return true;
    });
    return () => {
      unblock?.();
    };
  }, []);
```
2.随意点击菜单跳转，发现无法跳转

## 环境信息
Umi Version:4.0.64
Node Version:16.17.0
Platform:windows10

### 问题原因
这是 history.block(() => {}) 中回调函数的类型，返回值是 void ，没有以上对应的功能：
```
/**
 * A function that receives transitions when navigation is blocked.
 */
export interface Blocker {
    (tx: Transition): void;
}
```


## 解决方法
1. retry 方法可以让我们重新进入被阻止跳转的路由。如果想要 retry 生效，必须要在先取消掉所有 block 监听，否则 retry 后依然会被拦截然后进入 block 监听中

根据react-routerv5或者v6的文档

[https://v5.reactrouter.com/web/api/history](https://v5.reactrouter.com/web/api/history)

[https://github.com/remix-run/history/blob/main/docs/blocking-transitions.md](https://github.com/remix-run/history/blob/main/docs/blocking-transitions.md)

```
useEffect(() => {
  const unblock = history.block(({ location , retry}) => {
    // 想要路由不被拦截，先取消监听，在调用retry方法
    // unblock();
    // retry();

    // 时长这样使用
    if(!window.confirm("是否离开该页面？")){
      console.log('no')
    }else{
      unblock();
      retry();
    }
  });
  return () => {
    unblock?.();
  };
}, []);
```

2. 还可以借助一个变量使用allowNavigation，配合history.push(location)使用
```
useEffect(() => {
  if(allowNavigation) return; // 正常跳转
  const unblock = history.block(({ location , retry}) => {
     console.log('allowNavigation', allowNavigation)
    if(!allowNavigation){
      console.log('地址被拦截', location)
      if(!window.confirm("是否离开该页面？")){
        console.log('no')
      }else{
        setAllowNavigation(true)
        setTimeout(() => {
          history.push(location);
        }, 100);
      }
      return false
    }
    setAllowNavigation(false)
  });
  return () => {
    unblock?.();
  };
}, [allowNavigation]);
```

