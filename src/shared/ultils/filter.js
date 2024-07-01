function objectToQueryString(obj) {
    return Object.keys(obj)
        .filter(key => obj[key] != "")
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join("&");
}

export default objectToQueryString;