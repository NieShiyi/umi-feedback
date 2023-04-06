import { useEffect } from 'react'
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, history } from '@umijs/max';
import styles from './index.less';

const HomePage = () => {
  const { name } = useModel('global');

  useEffect(() => {
    // 如果在这个
    const unblock = history.block(({ location }) => {
      console.log('地址被拦截', location)
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
