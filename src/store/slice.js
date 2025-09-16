import { createSlice } from '@reduxjs/toolkit'

const LOCAL_KEY = 'dashboard_state_v1'

const initialState = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive dashboard',
      widgets: [
        { id: 'w1', name: 'Widget A', text: 'Random text A' },
        { id: 'w2', name: 'Widget B', text: 'Random text B' }
      ]
    },
    {
      id: 'security',
      name: 'Security Overview',
      widgets: [
        { id: 'w3', name: 'Widget C', text: 'Random text C' }
      ]
    }
  ]
}

function loadState() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return initialState
    return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to load state', e)
    return initialState
  }
}

function saveState(state) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state', e)
  }
}

const slice = createSlice({
  name: 'dashboard',
  initialState: loadState(),
  reducers: {
    addWidget(state, action) {
      const { categoryId, widget } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat) {
        cat.widgets.push(widget)
      }
      saveState(state)
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat) {
        cat.widgets = cat.widgets.filter(w => w.id !== widgetId)
      }
      saveState(state)
    },
    toggleCategory(state, action) {
      // Not used currently, placeholder
      saveState(state)
    },
    addCategory(state, action) {
      const { category } = action.payload
      state.categories.push(category)
      saveState(state)
    },
    setState(state, action) {
      return action.payload
    }
  }
})

export const { addWidget, removeWidget, addCategory, setState } = slice.actions
export default slice.reducer
