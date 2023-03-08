import React, { useEffect, useState } from 'react';
import styles from './LifeQuotes.module.scss';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';

const LifeQuotes = () => {
  const [sentenses, setSentense] = useState('');

  // 명언 테스트 API
  const fetchAPI = () => {
    const response = fetch(
      'https://api.qwer.pw/request/helpful_text?apikey=guest',
      {
        method: 'GET',
      }
    );
    return response.then((res) => res.json());
  };

  useEffect(() => {
    const fetchLifeQuotesAPI = async () => {
      try {
        const data = await fetchAPI();
        console.log(data);
        const [result, respond] = data;
        if (result.result === 'success') {
          setSentense(respond.respond);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLifeQuotesAPI();
  }, []);

  return (
    <div className={styles.life_quotes}>
      <span>
        <HiOutlineChatBubbleBottomCenterText />
      </span>
      <p>{sentenses}</p>
    </div>
  );
};

export default LifeQuotes;
