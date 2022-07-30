import { ACCOUNT_TYPE, GENDER } from 'src/entity/User.entity'

export interface SearchResultData {
    id: string
    imageurl?: string
    gender: GENDER
    name: string
    username: string
    owner?: boolean
    account_type?: ACCOUNT_TYPE
}
