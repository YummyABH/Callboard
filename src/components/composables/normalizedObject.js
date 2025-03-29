const normalizedinputValues = (object, key) => {
    let isFlag
    if (Array.isArray(object[key])) {
      isFlag = object[key].some((value) => Boolean(value) === true)
    } else if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      let keyFeedback = false
      for (keyFeedback in object[key]) {
        if (object[key][keyFeedback]) {
          return (keyFeedback = true)
        }
      }
    } else {
      isFlag = object[key]
    }
    return isFlag
  }

export { normalizedinputValues }