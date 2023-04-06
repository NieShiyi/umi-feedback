import { useEffect } from 'react'
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel, history } from '@umijs/max';
import styles from './index.less';

const HomePage = () => {
  const { name } = useModel('global');

  // history.block的回调函数不管有没有返回值或是返回任何值，都会阻止路由跳转。按理说teturn true应该是允许正常跳转的，但是现在还是被阻止。
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

  return (
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
  );
};

export default HomePage;
