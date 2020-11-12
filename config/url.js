import config from './config'
const base = config.DOMAIN

export const urlList = {
  getIssueList: base + '/questionnaire/issueList',
  getIssueById: base + '/questionnaire/issue',
  updateIssueContentById: base + '/questionnaire/issue',
  updateIssueStatus: base + '/questionnaire/issueStatus',
  deleteIssueById: base + '/questionnaire/issue',
  createIssue: base + '/questionnaire/issue',
  getUnionIdByCode: base + '/unionIdByCode',
  checkMemberInfo: base + '/memberInfo',
  getIssueListWithAnswerInfo: base+ '/questionnaire/issueListWithAnswerInfo',
  createUserAnswerInfo: base + '/questionnaire/userAnswerInfo',
  getIssueWithAnswerInfo: base + '/questionnaire/issueWithAnswerInfo',
  getScoreList: base + '/questionnaire/scoreListByUnionId'
}