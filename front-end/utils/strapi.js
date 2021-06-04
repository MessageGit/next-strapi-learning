export function createStrapiAxios(user, endpoint, embedMethod, embedBody) {
    return fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: embedMethod,
        headers: user && {
            Authorization: `Bearer ${user?.strapiToken}`,
        },
        body: embedBody
  })
}