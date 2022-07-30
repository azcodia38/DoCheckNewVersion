/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    ScrollView,
    TouchableOpacity as TouchableOpacityIOS,
} from 'react-native'
import { TouchableOpacity as TouchableOpacityAndroid } from 'react-native-gesture-handler'
import { ImagePickerResponse } from 'react-native-image-picker'
import { Modalize } from 'react-native-modalize'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { DebugAlert } from 'src/utils/alert'

import { updateProfileAPI, UpdateUserRequet } from 'src/api/profile'
import { uploadAPI } from 'src/api/upload'

import Button from 'src/components/atoms/button'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import FormDateInput from 'components/form/form-date-input/FormDateInput'
import FormTextInput from 'components/form/form-text-input/FormTextInput'
import FormTextareaInput from 'components/form/form-textarea-input/FormTextareaInput'
import Header from 'components/header/Header'
import { CalendarIcon, CameraIcon } from 'components/icons/Icons'
import Loading from 'components/loading/Loading'
import PilihFotoDialog from 'components/pilih-foto-dialog/PilihFotoDialog'
import { ImageProfile } from 'components/profile-card/styled'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import { getPlaceholderImage, NavProps } from 'src/utils/const'

import { ACCOUNT_TYPE, GENDER } from 'src/entity/User.entity'
import useAuthorization from 'src/hook/useAuthorization'
import { useKeyboard } from 'src/hook/useKeyboard'
import { setUserLoginData } from 'store/data/user'
import StoreData from 'store/types'
import {
    getDatefromDateOrString,
    isIOS,
    isValidDate,
    pickImage,
} from 'src/utils'
import {
    AbsoluteCameraPosition,
    CenterAlignment,
    EditProfilePageContainer,
} from 'src/pages/inside-pages/akun/edit-profile/styled'
import useConnected from 'src/hook/useConnected'

const TouchableOpacity = isIOS ? TouchableOpacityIOS : TouchableOpacityAndroid

interface EditProfilePageProps extends NavProps {}

export default function EditProfilePage(props: EditProfilePageProps) {
    const auth = useAuthorization(props.navigation)
    const dispatch = useDispatch()
    const [keyboard_height] = useKeyboard()
    const { connected } = useConnected()

    const userLoginData = useSelector(
        (store: StoreData) => store.user_login_data
    )

    const user = useMemo(() => userLoginData.user, [userLoginData])

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
    const [data, setData] = useState<UpdateUserRequet>({
        fullname: user.fullname,
        username: user.username,
        profilePicture: user.profilePicture,
        description: user.description,
        phoneNumber: user.phoneNumber ?? '',
        email: user.email ?? '',
        gender: user.gender,
        birthPlace: user.birthPlace ?? '',
        birthDate: isValidDate(user.birthDate as Date)
            ? moment(user.birthDate).format('DD/MM/YYYY')
            : '',
        city: user.city,
        hobby: user.hobby,
    })
    const modalizePilihFoto = useRef<Modalize>(null)
    const [birthDateError, setBirthDateError] = useState<string>('')

    const submitSimpan = useCallback(async () => {
        setLoading(true)
        try {
            await updateProfileAPI(auth, data)
            dispatch(
                setUserLoginData({
                    ...userLoginData,
                    user: {
                        ...userLoginData.user,
                        ...data,
                        birthDate: moment(
                            data.birthDate,
                            'DD/MM/YYYY'
                        ).toDate(),
                    },
                })
            )
            props.navigation.goBack()
        } catch (err: any) {
            DebugAlert(err.toString())
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        updateProfileAPI,
        auth,
        data,
        setUserLoginData,
        userLoginData,
        props.navigation,
    ])

    const uploadImage = useCallback(
        async (useCamera: boolean) => {
            let image: ImagePickerResponse
            try {
                image = await pickImage(useCamera)
            } catch (err) {
                return
            }

            setLoadingUpload(true)
            try {
                const image_url_response: string = await uploadAPI(
                    auth,
                    image.uri!,
                    image.type
                )
                setData({ ...data, profilePicture: image_url_response })
            } catch (err: any) {
                DebugAlert(err.toString())
            } finally {
                setLoadingUpload(false)
            }
        },
        [pickImage, setLoadingUpload, uploadAPI, auth, setData, data]
    )

    const openCameraHandler = useCallback(
        () => modalizePilihFoto.current?.open(),
        [modalizePilihFoto]
    )

    useEffect(() => {
        setBirthDateError(
            data.birthDate &&
                Math.abs(
                    moment(data.birthDate, 'DD/MM/YYYY').diff(
                        new Date(),
                        'years',
                        true
                    )
                ) < 17
                ? `Umur belum memenuhi persyaratan`
                : ''
        )
    }, [data.birthDate])

    return (
        <DocheckSafeAreaView>
            <EditProfilePageContainer>
                <WithPadding>
                    <Space value={7} />
                    <Header
                        title={'Ubah Profile'}
                        navigation={props.navigation}
                        style={{ marginBottom: 18 }}
                        withBack
                        greenArrow
                    />
                </WithPadding>
                <ScrollView>
                    <WithPadding>
                        <Space value={30} />
                        <CenterAlignment>
                            <Loading loading={loadingUpload}>
                                <TouchableOpacity
                                    onPress={openCameraHandler}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <ImageProfile
                                        source={
                                            data.profilePicture
                                                ? { uri: data.profilePicture }
                                                : getPlaceholderImage(
                                                      data.gender ??
                                                          GENDER.UNKNOWN
                                                  )
                                        }
                                    />
                                    <AbsoluteCameraPosition>
                                        <CameraIcon />
                                    </AbsoluteCameraPosition>
                                </TouchableOpacity>
                            </Loading>
                        </CenterAlignment>
                        <Space value={30} />
                        <FormTextInput
                            state={
                                (data.fullname ?? '').length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            label={'Nama'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            onChangeText={(fullname) =>
                                setData({ ...data, fullname })
                            }
                            value={data.fullname}
                            placeholder={'Nama lengkap'}
                        />
                        <FormTextInput
                            keyboardType={'default'}
                            state={
                                (data.username ?? '').length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            label={'Username'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            editable={false}
                            placeholderTextColor={'#818487'}
                            value={
                                user.accountType === ACCOUNT_TYPE.REGULAR
                                    ? data.username
                                    : `Login with ${user.accountType}`
                            }
                            onChangeText={(username) =>
                                setData({ ...data, username })
                            }
                            placeholder={'Tulis username paling keren'}
                        />
                        <FormTextareaInput
                            keyboardType={'default'}
                            state={
                                (data.description ?? '').length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            label={'Deskripsi'}
                            numberOfLines={4}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.description}
                            onChangeText={(description) =>
                                setData({ ...data, description })
                            }
                            placeholder={'Deskripsi'}
                        />
                        <FormTextInput
                            keyboardType={'phone-pad'}
                            state={
                                (data.phoneNumber ?? '').length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            label={'No Handphone'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.phoneNumber}
                            onChangeText={(_) =>
                                setData({
                                    ...data,
                                    phoneNumber: _.replace(/[^0-9]/g, ''),
                                })
                            }
                            maxLength={13}
                            placeholder={'No Handphone'}
                        />
                        <FormTextInput
                            keyboardType={'default'}
                            state={
                                (data.birthPlace ?? '').length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            label={'Tempat Lahir'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.birthPlace}
                            onChangeText={(birthPlace) =>
                                setData({ ...data, birthPlace })
                            }
                            placeholder={'Tempat Lahir'}
                        />
                        <FormDateInput
                            state={
                                data.birthDate === ''
                                    ? 'normal'
                                    : birthDateError.length > 0
                                    ? 'error'
                                    : 'done'
                            }
                            errorText={birthDateError}
                            label={'Tanggal Lahir'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            rightItem={<CalendarIcon />}
                            inputStyle={{
                                marginTop: isIOS ? 0 : 5,
                                marginBottom: isIOS ? 0 : 5,
                            }}
                            placeholderTextColor={'#818487'}
                            value={
                                data.birthDate
                                    ? moment(
                                          data.birthDate,
                                          'DD/MM/YYYY'
                                      ).format('DD/MMMM/YYYY')
                                    : undefined
                            }
                            date={
                                data.birthDate
                                    ? getDatefromDateOrString(data.birthDate)
                                    : undefined
                            }
                            onDateChange={(date) =>
                                setData({
                                    ...data,
                                    birthDate:
                                        moment(date).format('DD/MM/YYYY'),
                                })
                            }
                            placeholder={'Hari/Bulan/Tahun'}
                        />
                        <FormTextInput
                            keyboardType={'default'}
                            state={
                                (data.city ?? '').length > 0 ? 'done' : 'normal'
                            }
                            label={'Kota'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.city}
                            onChangeText={(city) => setData({ ...data, city })}
                            placeholder={'Kota'}
                        />
                        <FormTextInput
                            keyboardType={'default'}
                            state={
                                (data.hobby ?? '').length > 0
                                    ? 'done'
                                    : 'normal'
                            }
                            label={'Hobi'}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            placeholderTextColor={'#818487'}
                            value={data.hobby}
                            onChangeText={(hobby) =>
                                setData({ ...data, hobby })
                            }
                            placeholder={'Hobi'}
                        />
                        <Space value={30} />
                        <Button
                            loading={loading}
                            inactive={
                                !connected ||
                                birthDateError.length > 0 ||
                                data.fullname?.length === 0
                            }
                            onPress={submitSimpan}
                        >
                            Simpan
                        </Button>
                        <Space value={30} />
                        <Space value={32 + keyboard_height * isIOS} />
                    </WithPadding>
                </ScrollView>
                <Modalize
                    ref={modalizePilihFoto}
                    modalHeight={180}
                    modalStyle={{
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        elevation: 0,
                        overflow: 'hidden',
                        borderTopLeftRadius: 32,
                        borderTopRightRadius: 32,
                    }}
                    overlayStyle={{
                        backgroundColor: '#0001',
                        shadowOpacity: 0,
                        elevation: 0,
                    }}
                >
                    <PilihFotoDialog
                        disableHapusFoto={!data.profilePicture}
                        onFotoSekarang={() => {
                            uploadImage(true)
                            modalizePilihFoto.current?.close()
                        }}
                        onPilihDariGaleri={() => {
                            uploadImage(false)
                            modalizePilihFoto.current?.close()
                        }}
                        onHapusFoto={() => {
                            setData({ ...data, profilePicture: '' })
                            modalizePilihFoto.current?.close()
                        }}
                    />
                </Modalize>
            </EditProfilePageContainer>
        </DocheckSafeAreaView>
    )
}
