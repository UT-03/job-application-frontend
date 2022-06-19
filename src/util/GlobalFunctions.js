export const getMimetype = (contentType) => {
    return contentType.split('/')[1];
}