import { DateTime } from 'luxon';

import { getUserBoostExpiryTimestamp } from './index';

const subtractDate = (start, end) => {
  return (
    DateTime.fromISO(end).toSeconds() - DateTime.fromISO(start).toSeconds()
  );
};

export const getBoostItemStatus = async (boostLevel, userAddress) => {
  const expiryTimeStamp = await getUserBoostExpiryTimestamp(
    userAddress,
    boostLevel
  );
  const expiryDate =
    Number.parseInt(expiryTimeStamp, 10) === 0
      ? null
      : new Date(expiryTimeStamp * 1000);
  const showDate = DateTime.local().setZone('UTC').toISO();
  const activeStatus =
    expiryDate != null
      ? subtractDate(showDate, expiryDate.toISOString()) > 0
      : false;

  return {
    expiryDate,
    activeStatus,
  };
};
