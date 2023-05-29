import { useEffect, useState } from 'react'
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel, history, useIntl, getLocale, setLocale } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage = () => {
  const { formatMessage, } = useIntl()
  const { name } = useModel('global');
  const [curLang, setCurLang] = useState('');

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

  //  获取当前语言
  useEffect(() => {
    const locale = getLocale();
    setCurLang(locale);
  }, []);

  // 切换当前语言
  const handleChangeLang = () => {
    const lang = curLang === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLocale(lang, false);
    setCurLang(lang);
  };

  return (
    <div className={styles.container}>
      <Guide name={trim(name)} />

      <section>
        <h2>中英文切换（參照官網shili） <Button onClick={handleChangeLang}>{curLang === 'zh-CN' ? '切換英文' : '切换中文'}</Button></h2>
        {/* 正常 */}
        <p>{formatMessage({ id: 'welcome' })}</p>
        {/* 正常 */}
        <p>{formatMessage({ id: 'user.hello' })}</p>
        {/* 无法显示，在对应编写内容的文件中采取的是{user: {welcome: ''}}格式 */}
        <p>{formatMessage({ id: 'user.welcome' })}(没有正常显示)</p>
      </section>
    </div>
  );
};

export default HomePage;
