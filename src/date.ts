export const formatDate = (date: Date) => {
  const now = new Date()
  const dateString = date.toDateString()
  const isToday = now.toDateString() === dateString

  const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  return `${isToday ? 'Today' : dateString}, ${time}`
}
