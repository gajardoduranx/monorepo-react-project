import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState('')

  const getFactAndUpdateState = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  // Efecto para llamar a FACT
  useEffect(() => {
    // Primera Llammada - ENDPOINT FACTS
    getFactAndUpdateState()
  }, [])

  return { fact, getFactAndUpdateState }
}
