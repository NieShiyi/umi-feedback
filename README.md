# README

## 问题
history.block的回调函数不管有没有返回值或是返回任何值，都会阻止路由跳转。按理说teturn true应该是允许正常跳转的，但是现在还是被阻止了，都无法正常跳转页面。

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
