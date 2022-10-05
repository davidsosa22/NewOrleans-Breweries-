import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic'

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [breweries, setBreweries] = useState([]);

// fetch the data from the api
// /data is a restful api created in the backend using python
  useEffect(() => {
    // this is fetching the api created in the backend
    // fetch("/data")
    fetch("https://api.openbrewerydb.org/breweries?by_city=new_orleans&per_page=10")
    .then(res => {
      // console.log(res, 'data')
      print(res)
      return res.json()
    })
    .then(
      (data) => {
        setIsLoaded(true);
        // store the data in breweries state
        setBreweries(data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
      )
    }, [])


// these two variable are the paths to the components I will use.
// this is the path to the [id].js component
  const ROUTE_POST_ID = "posts/[id]";
  // this is the path to the map component
  const ROUTE_MAP = "map";

// check for errors using conditional rendering
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className={styles.main}>
        <h1>List of Breweries</h1>
        {/* map through the breweries data */}
        {breweries.map((brewery) => (
          <div key={`post-${brewery.id}`} className={styles.card} >
            <Link
              href={{
                pathname: ROUTE_POST_ID, ROUTE_MAP,
                // this is passing down the props to the map and [id].js components
                query: { id: brewery.id ,
                  name: brewery.name,
                  street: brewery.street,
                  city: brewery.city,
                  state: brewery.state,
                  zip: brewery.postal_code,
                  // url: brewery.url,
                  url: brewery.website_url,
                  lat: brewery.latitude,
                  lng: brewery.longitude
                }
              }}
            >
              <a>{brewery.name}</a>
            </Link>
          </div>
        ))}
      </div>
  );
          }
}



