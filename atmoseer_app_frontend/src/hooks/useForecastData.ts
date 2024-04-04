import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { ForecastData } from "../interfaces/forecast-data";

// Defina a função fetchData como uma função assíncrona
const fetchData = async (latitude: number | null, longitude: number | null): Promise<ForecastData | null> => {
  if (latitude && longitude) {
    // Chame a função assíncrona api.get e retorne a resposta
    return await api.get(`/forecast?latitude=${latitude}&longitude=${longitude}`);
  }
  // Se latitude ou longitude forem nulos, retorne null
  return null;
}

// Exporte a função useForecastData
export function useForecastData(latitude: number | null, longitude: number | null){
  // Use a função fetchData como queryFn em useQuery
  const query = useQuery({
    queryFn: () => fetchData(latitude, longitude), // Passando uma função que retorna fetchData
    queryKey: ['forecast-data'],
    enabled: !!latitude && !!longitude
  })

  return query;
}
