export const slugify = (str) => {
    return str.toLowerCase().split(" ").join("-").split("/").join("_")
}

export const reSlugify = (str) => {
    return str.toLowerCase().split("-").join(" ").split("_").join("/")
}