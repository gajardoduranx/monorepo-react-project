const CAT_ENDPOINT_RAMDOM_FACT = 'https://catfact.ninja/fact'

export const getRandomFact = () => {
  return fetch(CAT_ENDPOINT_RAMDOM_FACT)
    .then((response) => response.json())
    .then((data) => {
      const { fact } = data
      return fact
    })
}
