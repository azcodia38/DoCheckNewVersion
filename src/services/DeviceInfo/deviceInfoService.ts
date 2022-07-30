import { toLower } from 'lodash'
import { customAlphabet } from 'nanoid'
import DeviceInfo from 'react-native-device-info'

export default class DeviceInfoService {
    async getAPILevel() {
        const apiLevel = await DeviceInfo.getApiLevel()
        return apiLevel
    }

    async getAndroidID() {
        const androidID = await DeviceInfo.getAndroidId()
        return androidID
    }

    async getBatteryLevel() {
        const batteryLevel = await DeviceInfo.getBatteryLevel()
        return batteryLevel
    }

    async getVerboseInformation() {
        const brand = DeviceInfo.getBrand()
        const buildNumber = DeviceInfo.getBuildNumber()
        const providerCard = await DeviceInfo.getCarrier()
        const codeName = await DeviceInfo.getCodename()
        const deviceCode = await DeviceInfo.getDevice()
        const deviceId = DeviceInfo.getDeviceId()
        const docheckInstalledVersion = DeviceInfo.getVersion()
        const uniqueId = DeviceInfo.getUniqueId()
        const sessionId = customAlphabet('1234567890abcdefghijklmnopqrstupwxyz', 10)(15)

        return {
            deviceBrand: brand,
            buildNumber,
            providerCard: toLower(providerCard),
            deviceId,
            codeName,
            deviceCode,
            docheckInstalledVersion,
            uniqueId,
            sessionId,
        }
    }

    getDeviceID() {}
}
