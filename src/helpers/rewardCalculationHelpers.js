const getRewardValue = (
  playedPerDayLevel,
  playedTimeLevel,
  achievementLevel,
  challengesLevel,
  userLevel,
  amountStakedLevel,
  rewardValues
) => {
  if (amountStakedLevel <= 1) return Number(0).toFixed(3);

  const rewardAmount = Number(
    Number(
      rewardValues[playedTimeLevel - 1] +
        rewardValues[playedPerDayLevel - 1] +
        rewardValues[achievementLevel - 1] +
        rewardValues[challengesLevel - 1] +
        rewardValues[userLevel - 1] +
        rewardValues[amountStakedLevel - 1]
    )
  ).toFixed(3);

  return rewardAmount;
};
exports.getRewardValue = getRewardValue;

const getBoostIncreasedUserLevels = (userRewardLevels) => {
  const levelBoost = 3;
  let maxBoostLevel = 6;

  if (userRewardLevels.amountStakedLevel === 5) {
    maxBoostLevel = 8;
  }

  if (userRewardLevels.amountStakedLevel === 4) {
    maxBoostLevel = 7;
  }

  const boostedUserRewardLevels = {};
  const keys = Object.keys(userRewardLevels);
  keys.forEach((key) => {
    let calculatedLevel = userRewardLevels[key];
    calculatedLevel += levelBoost;

    if (calculatedLevel > maxBoostLevel) calculatedLevel = maxBoostLevel;

    boostedUserRewardLevels[key] = calculatedLevel;
  });

  return boostedUserRewardLevels;
};
exports.getBoostIncreasedUserLevels = getBoostIncreasedUserLevels;

const calculateRewardLevel = (userValue, qualifyingCriteria) => {
  let parsedUserValue = Number.parseInt(userValue, 10)
    ? Number.parseInt(userValue, 10)
    : 1;
  if (parsedUserValue < 0) parsedUserValue = 0;
  let calculatedLevel = 1;
  if (parsedUserValue >= qualifyingCriteria.level2) {
    calculatedLevel = 2;
  }
  if (parsedUserValue >= qualifyingCriteria.level3) {
    calculatedLevel = 3;
  }
  if (parsedUserValue >= qualifyingCriteria.level4) {
    calculatedLevel = 4;
  }
  if (parsedUserValue >= qualifyingCriteria.level5) {
    calculatedLevel = 5;
  }

  return calculatedLevel;
};
exports.calculateRewardLevel = calculateRewardLevel;

const getPlayedTimeLevel = (playedTime, qualifyingCriteria) => {
  let parsedPlayTimeInMinutes = Math.floor(Number(playedTime / 60));
  if (!parsedPlayTimeInMinutes) parsedPlayTimeInMinutes = 0;
  return calculateRewardLevel(parsedPlayTimeInMinutes, qualifyingCriteria);
};
exports.getPlayedTimeLevel = getPlayedTimeLevel;

const getUserLevel = () => {
  // TODO - needs to be implemented
  return 5;
};
exports.getUserLevel = getUserLevel;

const getAmountStakedLevel = (userStakedValues) => {
  for (let index = userStakedValues.length - 1; index >= 0; index -= 1) {
    if (
      userStakedValues[index] &&
      Number.parseInt(userStakedValues[index], 10) > 0
    ) {
      const calcLevel = index + 1;
      return calcLevel > 5 ? 5 : calcLevel;
    }
  }
  return 1;
};
exports.getAmountStakedLevel = getAmountStakedLevel;

const getMultipliedRewards = (rewards, earnMultiplier, boostMultiplier) => {
  const multipliedRewards = [];
  for (let index = 0; index < rewards.length; index += 1) {
    if (index < 5) {
      multipliedRewards[index] = +Number(
        rewards[index] * earnMultiplier
      ).toFixed(2);
    } else {
      multipliedRewards[index] = +Number(
        rewards[index] * boostMultiplier
      ).toFixed(2);
    }
  }
  return multipliedRewards;
};
exports.getMultipliedRewards = getMultipliedRewards;

const getPassiveEarnRewards = (userStakedValues, apr, multiplier) => {
  if (!(userStakedValues[1] > 0)) return 0;

  const stakedValue = userStakedValues[1];

  const multipliedApr = apr * multiplier;

  const yearlyGain = (stakedValue / 100) * multipliedApr;

  const dailyGain = yearlyGain / 365;

  return dailyGain;
};
exports.getPassiveEarnRewards = getPassiveEarnRewards;

const getUserLevels = (
  userData,
  activity,
  stakedTokens,
  qualifyingCriteria
) => {
  let userRewardLevels = {
    playedTimeLevel: getPlayedTimeLevel(
      activity.playedTime,
      qualifyingCriteria.playedTime
    ),
    playedPerDayLevel: calculateRewardLevel(
      activity.totalPlays,
      qualifyingCriteria.playsPerDay
    ),
    achievementLevel: calculateRewardLevel(
      userData.achievements,
      qualifyingCriteria.achievements
    ),
    challengesLevel: calculateRewardLevel(
      userData.loginCount,
      qualifyingCriteria.challenges
    ),
    userLevel: getUserLevel(),
    amountStakedLevel: getAmountStakedLevel(stakedTokens),
  };

  if (userRewardLevels.amountStakedLevel > 2) {
    userRewardLevels = getBoostIncreasedUserLevels(userRewardLevels);
  }

  return userRewardLevels;
};
exports.getUserLevels = getUserLevels;

const getRewardValueFromUserLevels = (userLevels, rewardValues) => {
  const calculatedRewards = getRewardValue(
    userLevels.playedPerDayLevel,
    userLevels.playedTimeLevel,
    userLevels.achievementLevel,
    userLevels.challengesLevel,
    userLevels.userLevel,
    userLevels.amountStakedLevel,
    rewardValues
  );
  return Number(calculatedRewards).toFixed(3);
};
exports.getRewardValueFromUserLevels = getRewardValueFromUserLevels;

const getPlayRewardsForUser = (
  userData,
  activity,
  stakedTokens,
  rewards,
  qualifyingCriteria
) => {
  return getRewardValueFromUserLevels(
    getUserLevels(userData, activity, stakedTokens, qualifyingCriteria),
    rewards
  );
};
exports.getPlayRewardsForUser = getPlayRewardsForUser;

const getTotalRewardsForUser = (
  userData,
  activity,
  stakedTokens,
  rewards,
  qualifyingCriteria,
  passiveRewards
) => {
  const rewardsFromPlaying = getRewardValueFromUserLevels(
    getUserLevels(userData, activity, stakedTokens, qualifyingCriteria),
    rewards
  );

  const totalRewards = Number(rewardsFromPlaying) + Number(passiveRewards);
  return Number(totalRewards).toFixed(3);
};
exports.getTotalRewardsForUser = getTotalRewardsForUser;
