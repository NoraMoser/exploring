import React from 'react';
import { useParams } from "react-router-dom";
import { fetchCountryByCode } from '../services/countriesAPI';

//components
import CountryMaps from '../components/CountryMaps';
import CountryDetailHeader from '../components/CountryDetailHeader';
import CountryDetailInfos from '../components/CountryDetailInfo';


import { useQuery } from '@tanstack/react-query';
//https://tanstack.com/query/latest/docs/framework/react/overview

const CountryDetail = () => {
    const {code} = useParams<{code:string}>();
    //get code out of the url
    const {
        data: country,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["country", code], //the key that react query requires
        queryFn: () => fetchCountryByCode(code!), //the ! is a non null assertion operator (only do this if you know there is a value)
        enabled: !!code //this makes react query only run if you have data in code so no errors
      });

      if (isLoading || !country) return <p>Loading...</p>; //had to do this bc country isn't immediately available
      if (error) return <p>Error loading countries.</p>;

    return (
        <div>
            <CountryDetailHeader country={country}/>
            <CountryMaps country={country} />
            <CountryDetailInfos country={country}/>
        </div>
    )
}

export default CountryDetail