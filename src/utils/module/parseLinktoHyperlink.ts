/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

// module that doesnt have any declaration type
const extractUrls = require('extract-urls')

const ParseStringtoHyperlink = (description: string): string[] | any => {
    let urls = extractUrls(description)
    return urls
}

export default ParseStringtoHyperlink
