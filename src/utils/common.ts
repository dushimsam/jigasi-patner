
const {promisify} = require('util');
const fs = require('fs');
const _ = require('lodash');
const unlinkAsync = promisify(fs.unlink);


const BASE_DIR = '../../';



exports.fileUnlink = async (PATH_DIRECTORY:any, file_prefix:any, file:any) => {
    const filename = BASE_DIR + PATH_DIRECTORY + file;
    if (fs.existsSync(filename)) {
        await unlinkAsync(filename);
    }
}



/**
 * Returns Object Values as Enum
 * @type {*[]}
 */
exports.getEnumFromObject = (obj:any) => {
    return Object.keys(obj)
        .map((key) => {
            return obj[key]
        });
}


/**
 * GET API RESPONSE
 * @param success
 * @param message
 * @param err
 * @param status
 * @param extra
 * @returns object
 * @constructor
 */
exports.API_RESPONSE = (success:any, message:any, err:any, status:any, extra = null) => {
    if (success) return {success: success, message: message.toUpperCase(), status: status, extra}
    return {success: success, message: message.toUpperCase(), error: err, status: status, extra}
}




exports.fileFromPathUnlink = async (PATH:string) => {
    try {
        const FULL_PATH = PATH;
        if (fs.existsSync(FULL_PATH)) {
            await unlinkAsync(FULL_PATH);
            return {success: true, message: 'File Deleted Successfully'};
        } else return null;
    } catch (e) {
        return null;
    }
}





/**
 * Get Aggregated Data
 * @param array
 * @returns {any}
 */
exports.getTranspiledData = (array:any) => {
    return _.merge(...array)
}




exports.existsInRange = (range:any, year:any) => {
    return year >= range.start && year <= range.end;
}

const encodeUrl = (uri:any) => {
    return encodeURIComponent(uri);
}


exports.appendFileUrl = (entity:any, prop:any, paginated = false) => {
    const isArray = entity instanceof Array;
    const HOST = process.env.PROD_URL;

    if (!paginated) {
        if (isArray) {
            const instances = JSON.parse(JSON.stringify(entity));
            for (let en of instances) {
                en.imageUrl = HOST + '/api/files/load/' + encodeUrl(en[prop]);
            }
            return instances;
        } else {
            entity = JSON.parse(JSON.stringify(entity));
            entity.imageUrl = HOST + '/api/files/load/' + encodeUrl(entity[prop]);
            return entity;
        }
    } else {
        const instances = JSON.parse(JSON.stringify(entity));

        for (let en of instances.docs) {
            en.imageUrl = HOST + '/api/files/load/' + encodeUrl(en[prop]);
        }
        console.log(instances)
        return instances;
    }
}


exports.decodeURI = (uri:any) => {
    return decodeURIComponent(uri);
}


exports.generateCode = () => {
    let result = '';
    const characters = '0123456789';
    const len = characters.length;

    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * len));
    }

    return result;
}




exports.shuffle = (arr:any) => {

    let currIndex = arr.length;
    let randIndex;


    while (0 !== currIndex) {
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex--;

        // And swap it with the current element.
        [arr[currIndex], arr[randIndex]] = [
            arr[randIndex], arr[currIndex]];
    }

    return arr;
}



exports.immutate = (obj:any) => {
    return JSON.parse(JSON.stringify(obj))
}


const errorResponseHandler = (message:any, data = null, status = 200) => {
    return {success: false, message, data, status}
}

exports.requestHandler = (handler:any) => {
    return async function (req:any, res:any) {
        try {
            return await handler(req, res)
        } catch (e:any) {
            return res.status(500).send(errorResponseHandler("Internal Server Error", e.toString(), 500))
        }
    }
}


exports.encodeUrl = encodeUrl;