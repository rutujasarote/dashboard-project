import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addWidget, removeWidget, addCategory } from './store/slice'
import { v4 as uuidv4 } from 'uuid'

function Widget({ widget, onRemove }) {
  return (
    <div className="widget">
      <div className="widget-header">
        <strong>{widget.name}</strong>
        <button className="icon-btn" onClick={() => onRemove(widget.id)}>✕</button>
      </div>
      <div className="widget-body">{widget.text}</div>
    </div>
  )
}

function Category({ category, onAddWidget, onRemoveWidget }) {
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  function handleAdd() {
    if (!name.trim()) return
    onAddWidget(category.id, { id: uuidv4(), name: name.trim(), text: text || 'Random text' })
    setName(''); setText(''); setShowAdd(false)
  }

  return (
    <div className="category">
      <h3>{category.name}</h3>
      <div className="widgets-grid">
        {category.widgets.map(w => (
          <Widget key={w.id} widget={w} onRemove={(wid) => onRemoveWidget(category.id, wid)} />
        ))}
      </div>

      {showAdd ? (
        <div className="add-form">
          <input placeholder="Widget name" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Widget text" value={text} onChange={e => setText(e.target.value)} />
          <div className="add-actions">
            <button onClick={handleAdd}>Add</button>
            <button onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-widget-btn" onClick={() => setShowAdd(true)}>+ Add Widget</button>
      )}
    </div>
  )
}

export default function App() {
  const state = useSelector(s => s.dashboard)
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [newCatName, setNewCatName] = useState('')

  function handleAddWidget(categoryId, widget) {
    dispatch(addWidget({ categoryId, widget }))
  }

  function handleRemoveWidget(categoryId, widgetId) {
    dispatch(removeWidget({ categoryId, widgetId }))
  }

  function handleAddCategory() {
    if (!newCatName.trim()) return
    dispatch(addCategory({ category: { id: uuidv4(), name: newCatName.trim(), widgets: [] } }))
    setNewCatName('')
  }

  const filtered = state.categories.map(cat => ({
    ...cat,
    widgets: cat.widgets.filter(w => (w.name + ' ' + w.text).toLowerCase().includes(query.toLowerCase()))
  }))

  return (
    <div className="container">
      <header>
        <h1>Dashboard Assignment</h1>
        <div className="controls">
          <input placeholder="Search widgets..." value={query} onChange={e => setQuery(e.target.value)} />
          <div className="new-cat">
            <input placeholder="New category name" value={newCatName} onChange={e => setNewCatName(e.target.value)} />
            <button onClick={handleAddCategory}>Add Category</button>
          </div>
        </div>
      </header>

      <main>
        {filtered.map(cat => (
          <Category key={cat.id} category={cat} onAddWidget={handleAddWidget} onRemoveWidget={handleRemoveWidget} />
        ))}
      </main>

      <footer>
        <small>Data is stored locally in your browser (localStorage).</small>
      </footer>
    </div>
  )
}
