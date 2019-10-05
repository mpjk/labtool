import { useState } from 'react'

const store = window.localStorage
const myPrefix = 'labtoolPersistedState_'

/* eslint react-hooks/rules-of-hooks: off */
// leave me alone, I know what I'm doing

/*
 * usePersistedLegacyState(prefix, { stateVariable: defaultValue })
 * Prefix should be unique per component/page
 */
const useLegacyPersistedState = (prefix, vars) => {
  const _get = {}
  const _set = {}
  const keys = Object.keys(vars)
  const result = {}
  const lsprefix = `${myPrefix}${prefix}_`

  for (const key of keys) {
    let storeValue = store.getItem(lsprefix + key)
    if (storeValue) {
      try {
        storeValue = JSON.parse(storeValue)
      } catch (e) {
        storeValue = null
      }
    }
    const [g, s] = useState(storeValue !== null ? storeValue : vars[key])
    _get[key] = g
    _set[key] = s

    Object.defineProperty(result, key, {
      enumerable: false,
      configurable: false,
      get: () => _get[key],
      set: val => {
        _set[key](val)
        store.setItem(lsprefix + key, JSON.stringify(val))
      }
    })
  }

  result.clear = () => {
    for (const key of keys) {
      store.removeItem(lsprefix + key)
    }
  }

  return result
}

const clearAllPersistedStates = () => {
  Array.from(Array(store.length).keys()) // this generates a range [0, store.length[
    .map(i => store.key(i))
    .filter(key => key.startsWith(myPrefix))
    .forEach(key => store.removeItem(key))
}

export { useLegacyPersistedState, clearAllPersistedStates }
