export default function formatDate(dateString: string | Date): string {
  const date = dateString instanceof Date ? dateString : new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }

  return date.toLocaleDateString('pt-BR', options)
}
