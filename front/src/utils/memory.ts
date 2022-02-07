export const setLocalStorage = (name:string, content:string) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export const getLocalStorage = (name:string) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

export const removeLocalStorage = (name:string) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

export const  clearAllCookie = () => {
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

