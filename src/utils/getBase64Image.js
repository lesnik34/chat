export const getBase64Image = (file) => new Promise(resolve => {
    const reader  = new FileReader();

    reader.onloadend = function (FileLoadEvent) {
        const srcData = FileLoadEvent.target.result;
        resolve(srcData);
    }

    reader.readAsDataURL(file);
})