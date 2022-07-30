import { RadioOption } from 'components/form/form-radio-input/FormRadioInput'
import { sortBy } from 'lodash'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import StoreData from 'store/types'

interface UseMemberGroupTransform {
    values?: string[]
    options?: RadioOption<string>[]
    waitingListID?: string[]
}

export default function UseMemberGroupTransform({
    values,
    options,
    waitingListID,
}: UseMemberGroupTransform) {
    const user = useSelector((user: StoreData) => user.user_login_data.user)

    const memberGoalTransform = useMemo(
        () => (values ?? []).slice(0, 4),
        [values]
    )

    const memberDataTransform = useMemo(
        () =>
            sortBy(
                memberGoalTransform
                    .filter((userId) => userId != user.id)
                    .map((item) => options?.find((v) => v?.value == item)),
                (memberGoal) =>
                    (waitingListID ?? []).includes(memberGoal?.value ?? '')
            ).map((item) => item?.value ?? ''),

        [options, memberGoalTransform, waitingListID, sortBy, user.id]
    )

    const ownerTransform = useMemo(
        () => memberGoalTransform.filter((item) => item == user.id),
        [user.id, memberGoalTransform]
    )

    const memberGroupTransform = useMemo(
        () =>
            [...ownerTransform, ...memberDataTransform].map((value: string) => {
                const memberData = (options ?? []).find(
                    (v) => v.value === value
                )
                return {
                    isWaiting: (waitingListID ?? []).includes(
                        memberData?.value ?? ''
                    ),
                    uri: memberData?.label ?? '',
                }
            }),
        [values, options, waitingListID, ownerTransform, memberDataTransform]
    )

    return {
        memberGroupTransform,
    }
}
