import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { ForecastData } from "../interfaces/forecast-data";

const fetchData = async (latitude: number | null, longitude: number | null): Promise<ForecastData | null> => {
  if (latitude && longitude) {
    return await api.get(`/forecast?latitude=${latitude}&longitude=${longitude}`);
  }
  return null;
}

export function useForecastData(latitude: number | null, longitude: number | null){
  const query = useQuery({
    queryFn: () => fetchData(latitude, longitude), // Passando uma função que retorna fetchData
    queryKey: ['forecast-data'],
    enabled: !!latitude && !!longitude
  })

  return query;
}
