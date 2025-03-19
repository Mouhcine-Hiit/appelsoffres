export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", options)
}

export const calculateDaysRemaining = (dateString) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const deadline = new Date(dateString)
  deadline.setHours(0, 0, 0, 0)

  const diffTime = deadline - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}

