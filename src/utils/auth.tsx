
export const saveToken = (payload: { token_type: string, access_token: string }) => {
  localStorage.setItem("token_type", payload.token_type)
  localStorage.setItem("access_token", payload.access_token)
}

export const hasToken = () => {
  if (localStorage.getItem("token_type") && localStorage.getItem("access_token")) {
    return true
  }
  return false
}

export const getToken = () => {
  const token_type = localStorage.getItem("token_type")
  const access_token = localStorage.getItem("access_token")
  if (token_type && access_token) {
    return `${token_type} ${access_token}`
  }
  return null
}

export const clearToken = () => {
  localStorage.removeItem("token_type")
  localStorage.removeItem("access_token")
}