import React, { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import Card from "./Card"

import { Country, cn } from "./App"
import axios from "axios"

interface Props {
  countries: Country[]
  handleRegion: (region: string) => void
  region: string
  darkTheme: boolean
}

const CardList: React.FC<Props> = ({
  countries,
  region,
  handleRegion,
  darkTheme,
}) => {
  const [fetchedCountries, setFetchedCountries] = useState<Country[]>()
  const [filteredCountries, setFilteredCountries] = useState<Country[]>()
  const [name, setName] = useState("")

  useEffect(() => {
    if (region !== "Filter by Region") {
      setFilteredCountries(
        fetchedCountries?.filter((el) => el.region === region)
      )
    } else {
      setFilteredCountries(fetchedCountries)
    }
  }, [region, fetchedCountries])

  useEffect(() => {
    if (name.trim() !== "") {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then((res) => {
          setFetchedCountries(res.data)
        })
        .catch((err) => {})
    } else {
      setFetchedCountries(countries)
    }
  }, [name, countries])

  const handleFilter = (region: string) => {
    handleRegion(region)
  }

  const searchNameTest = (name: string) => {
    setName(name)
  }

  return (
    <>
      <div className={`container container--cardlist ${cn(darkTheme)}`}>
        <SearchBar
          handleFilter={handleFilter}
          searchNameTest={searchNameTest}
          region={region}
        />
        <div className="cardlist">
          {filteredCountries?.map((country, i) => {
            return <Card key={i} country={country} />
          })}
        </div>
      </div>
    </>
  )
}

export default CardList
