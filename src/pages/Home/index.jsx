import { useEffect, useState } from 'react'
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel, history } from '@umijs/max';
import styles from './index.less';

const HomePage = () => {
  const { name } = useModel('global');
  const [allowNavigation, setAllowNavigation] = useState(false);

  // history.block的回调函数不管有没有返回值或是返回任何值，都会阻止路由跳转。按理说teturn true应该是允许正常跳转的，但是现在还是被阻止。
  // useEffect(() => {
  //   const unblock = history.block(({ location }) => {
  //     console.log('地址被拦截', location)
  //     // return false
  //     // return "hello"
  //     return true;
  //   });
  //   return () => {
  //     unblock?.();
  //   };
  // }, []);

  // 这是 history.block(() => {}) 中回调函数的类型，返回值是 void ，没有我说的功能：
  // 可以改为如下：
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

  // 还可以借助一个变量使用allowNavigation，配合history.push(location)使用
  // useEffect(() => {
  //   if(allowNavigation) return; // 正常跳转
  //   const unblock = history.block(({ location , retry}) => {
  //      console.log('allowNavigation', allowNavigation)
  //     if(!allowNavigation){
  //       console.log('地址被拦截', location)
  //       if(!window.confirm("是否离开该页面？")){
  //         console.log('no')
  //       }else{
  //         setAllowNavigation(true)
  //         setTimeout(() => {
  //           history.push(location);
  //         }, 100);
  //       }
  //       return false
  //     }
  //     setAllowNavigation(false)
  //   });
  //   return () => {
  //     unblock?.();
  //   };
  // }, [allowNavigation]);

  return (
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
  );
};

export default HomePage;
