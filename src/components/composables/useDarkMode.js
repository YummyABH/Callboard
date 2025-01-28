export const toggleDarkMode = () => {
  if (localStorage.theme === 'dark') {
    localStorage.theme = 'light'
  } else {
    localStorage.theme = 'dark'
  }
  return applyTheme()
}

export const applyTheme = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
    return 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
    return 'light'
  }
}
