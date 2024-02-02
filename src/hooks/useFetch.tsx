import useSWR from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/_internal';

export default function useFetch<Data = any, Error = any>(
    url: string,
    isRequest = true,
    swrOptions?: Partial<PublicConfiguration<Data, Error, BareFetcher<Data>>> | undefined
) {
    const { data, error, isLoading, isValidating, mutate } = useSWR<Data, Error>(
        isRequest ? url : null,
        async (arg: any) => {
            const response = await fetch(arg);

            if (!response.ok) {
                throw new Error(response.status.toString());
            }

            return response.json();
        },
        swrOptions
    );

    return { data, error, isLoading, isValidating, mutate };
}
