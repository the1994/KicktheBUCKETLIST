const generateStatisticsItems = achievements => {
  const allAchievementsCnt = achievements.length;
  const completedCnt = achievements.filter(item => item.completed).length;

  const baseProperties = {
    id: null,
    subCategoryId: null,
    achievementsId: null,
    title: '',
    description: '',
    completed: 0,
    completedDate: null,
    completedYear: null,
    review: null,
    images: null,
    isFailure: 0,
    subAchievements: [],
  };

  const generateItem = newProperties => {
    return {
      ...baseProperties,
      ...newProperties,
    };
  };

  const achievementRateItem = generateItem({
    prefix: 'auto',
    subCategoryId: 8,
    title: '자동으로 추가됨 1',
    description: '달성률을 알아보자.',
    subTitles: ['항목 25% 완료하기.', '항목 50% 완료하기.', '항목 75% 완료하기.', '항목 100% 완료하기.'],
    subDescriptions: ['', '', '', ''],
    subCompletedFn: param => {
      const achievementRate = completedCnt / allAchievementsCnt;
      return achievementRate >= param ? 1 : 0;
    },
    subCompletedBase: [0.25, 0.5, 0.75, 1],
  });

  const achievementCountItem = generateItem({
    prefix: 'auto',
    subCategoryId: 8,
    title: '자동으로 추가됨 2',
    description: '항목이 총 몇 개일까?.',
    subTitles: ['항목 1개 만들기.', '항목 100개 만들기.', '항목 500개 만들기.', '항목 1000개 만들기.'],
    subDescriptions: ['이제 시작입니다!', '', '', ''],
    subCompletedFn: params => {
      return allAchievementsCnt >= params ? 1 : 0;
    },
    subCompletedBase: [1, 100, 500, 1000],
  });
  const statisticsItems = [achievementRateItem, achievementCountItem];

  const autoGeneratedItems = statisticsItems.map((item, idx) => {
    const {
      prefix,
      subCategoryId,
      title,
      description,
      subTitles,
      subDescriptions,
      subCompletedFn,
      subCompletedBase,
      ...properties
    } = item;
    const subAchievements = subCompletedBase.map((subItem, subIdx) => {
      return {
        ...properties,
        id: `${prefix}-${idx}-${subIdx}`,
        achievementsId: `${prefix}-${idx}`,
        title: subTitles[subIdx],
        description: subDescriptions[subIdx],
        completed: subCompletedFn(subCompletedBase[subIdx]),
      };
    });
    return {
      ...properties,
      id: `${prefix}-${idx}`,
      subCategoryId,
      title,
      description,
      completed: subAchievements.every(item => item.completed) ? 1 : 0,
      subAchievements,
    };
  });
  return autoGeneratedItems;
};

export default {
  generateStatisticsItems,
};
