
fetch('http://10.170.210.202:7003/ServiceUTILITIES-UTILITIES-context-root/resources/ServiceUTILITIES/cruFile', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

    },
    body: JSON.stringify({
        "APP_KEY": "SPC.NRKH",
        "ORG_CODE": userCurrent?.ORG_CODE,
        "FILE_NAME": item.FILE_NAME,
        "FILE_TYPE": item.FILE_TYPE,
        "FILE_CONTENT": replaceTypeFileByNull(item.FILE_TYPE, item.FILE_CONTENT),
        "CREATED_BY": "36849"
    })
})

fetch('http://10.170.210.202:7003/ServiceUTILITIES-UTILITIES-context-root/resources/ServiceUTILITIES/getImageByID', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "FILE_ID": ii
    })
})

getDataFromFileInput = async (file) => {
    const convert = await blobToBase64(file);
    const single = {
        FILE_CONTENT: convert,
        SIZE: file.size.toString(),
        FILE_NAME: file.name,
        FILE_TYPE: file.type
    }
    return single
}
const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

export const replaceTypeFileByNull = (type, str) => {
    if (str && type) {
        switch (type) {
            case "image/jpeg":
                return str.replace("data:image/jpeg;base64,", "");
                break;
            case "image/png":
                return str.replace("data:image/png;base64,", "");
                break;
            case "application/pdf":
                return str.replace("data:application/pdf;base64,", "");
                break;
            default:
                // code block
                return null
        }
    }
    return null;
}