import { writable } from 'svelte/store'

const NORMAL = 'normal'
const SUCCESS = 'success'
const ERROR = 'error'

export const activeInfoDisplay = writable({
  status: NORMAL,
  displayText: 'Document your World.'
})
