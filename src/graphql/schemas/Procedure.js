export default `

enum VoteDecision {
  YES
  ABSTINATION
  NO
  NOTVOTED
}

type ProcedureCustomData {
  title: String
  voteResults: VoteResults
  expectedVotingDate: Date
}

type VoteResults {
  yes: Int
  no: Int
  abstination: Int
  notVoted: Int
  decisionText: String
  partyVotes: [PartyVote]
}

type PartyVote {
  party: String!
  main: VoteDecision
  deviants: Deviants
}

input PartyVoteInput {
  party: String!
  main: VoteDecision
  deviants: DeviantsInput
}

type Deviants {
  yes: Int
  abstination: Int
  no: Int
  notVoted: Int
}

input DeviantsInput {
  yes: Int
  abstination: Int
  no: Int
  notVoted: Int
}

type Procedure {
  _id: ID!
  title: String!
  procedureId: String
  type: String
  period: Int
  currentStatus: String
  currentStatusHistory: [String]
  signature: String
  gestOrderNumber: String
  approvalRequired: [String]
  euDocNr: String
  abstract: String
  promulgation: [String]
  legalValidity: [String]
  tags: [String]
  subjectGroups: [String]
  history: [ProcessFlow]
  importantDocuments: [Document]
  bioUpdateAt: Date
  customData: ProcedureCustomData
}

type Query {
  getProcedure(_id: ID!): Procedure
  procedures(offset: Int, IDs: [String!], status: [String!], voteDate: [Boolean!]): [Procedure]
  allProcedures(offset: Int): [Procedure]
  procedureUpdates(offset: Int, period: [Int!], type: [String!]): [Procedure]
}

type Mutation {
  saveProcedureCustomData(procedureId: String!, partyVotes: [PartyVoteInput!]!, decisionText: String!): Procedure
}
`;
