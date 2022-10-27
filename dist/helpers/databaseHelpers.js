import { withoutWalletAuthFetchWrapper } from './apiFetchWrappers';
export const getEarningSettings = async () => {
  try {
    const resp = await withoutWalletAuthFetchWrapper('Earnings/GetEarningsSettings', 'GET', null);
    const earningSettingsDbRecord = resp;
    const earningSettings = {};
    if (earningSettingsDbRecord) {
      earningSettings.APR = earningSettingsDbRecord.apr;
      earningSettings.APRMultiplier = earningSettingsDbRecord.aprMultiplier;
      earningSettings.EarnMultiplier = earningSettingsDbRecord.earnMultiplier;
    }
    return earningSettings;
  } catch (error) {
    console.log('failed to fetch earning settings');
    return null;
  }
};