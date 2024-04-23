import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { OpenMeteoData } from "../interfaces/openmeteo-data";

const fetchData = async (latitude: number | null, longitude: number | null): Promise< OpenMeteoData | null> => {
  if (latitude && longitude) {
    return await api.get(`/weather?latitude=${latitude}&longitude=${longitude}&service=open-meteo`);
  }
  return null;
}

export function useOpenMeteoData(latitude: number | null, longitude: number | null){
  const query = useQuery({
    queryFn: () => fetchData(latitude, longitude), 
    queryKey: ['openmeteo-data'],
    enabled: !!latitude && !!longitude
  })
  

  return query;
}