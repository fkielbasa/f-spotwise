import { useAxios } from "@/composables/useAxios.ts"
import { HttpMethodEnum } from "@/types/httpEnum.ts"
import { type TripResponse } from "@/types/trip.ts"

export async function getTripData(): Promise<TripResponse | null> {
    const response = await useAxios<TripResponse>({
        url: `/trip`,
        method: HttpMethodEnum.Get,
        defaultErrorMessage: "Error",
    });
    return response.data;
}

