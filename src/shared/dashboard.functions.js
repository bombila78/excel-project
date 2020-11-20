import {storage} from '@core/utils';

function toHtml(key) {
  const state = storage(key)
  const tableId = key.split(':')[1]
  return `
    <li class="db__record">
        <a href="#excel/${tableId}">${state.title}</a>
        <strong>
          ${new Date(state.lastOpened).toLocaleDateString()}
          ${new Date(state.lastOpened).toLocaleTimeString()}
        </strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
  keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>You haven't create tables yet</p>`
  }

  return `
      <div class="db__list-header">
          <span>Table Name</span>
          <span>Last Opened</span>
      </div>

      <ul class="dv__list">
        ${keys.map(toHtml).join('')}
      </ul>
  `
}
