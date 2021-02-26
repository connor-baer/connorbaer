import React from 'react';
import styled from '@emotion/styled';

import { getPreview } from '../services/preview';
import { useLocalStorage } from '../hooks/useStorage';
import Meta from '../components/Meta';
import Clock from '../components/dashboard/Clock';
import Countdown from '../components/dashboard/Countdown';
// import UpcomingEvent from '../components/dashboard/UpcomingEvent';

const Centered = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StyledClock = styled(Clock)`
  font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
  font-weight: bold;
  font-size: 11vw;
`;

export function getStaticProps(context) {
  return { props: { preview: getPreview(context) } };
}

export default function Dashboard() {
  const title = 'Dashboard';
  const description = 'Personal dashboard';

  const [showSeconds, setShowSeconds] = useLocalStorage(
    '@mbc/show-seconds',
    true,
  );
  const toggleSeconds = () => {
    setShowSeconds((prev) => !prev);
  };

  return (
    <>
      <Meta title={title} description={description} index={false} />
      <Centered>
        <StyledClock showSeconds={showSeconds} onClick={toggleSeconds} />
        <Countdown title="moving day 🚚" date={new Date('2021-03-30')} />
        {/* <UpcomingEvent /> */}
      </Centered>
    </>
  );
}
