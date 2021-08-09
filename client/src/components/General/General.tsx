import React, { useEffect } from "react";
import axios from "axios";
import { GeneralProps, Hero } from "../../types";
const General = (props: GeneralProps) => {
  const { heroes, setHeroes } = props;
  useEffect(() => {
    async function getHeroes() {
      axios
        .get(
          "https://akabab.github.io/superhero-api/api/all.json"
        )
        .then((r) => {
          const fixedHeroes = r.data.map((h:any) => {
            return {
              id: h.id,
              name: h.name,
              realName: h.biography.fullName,
              power: h.powerstats,
              image: h.images.sm,
            }
          });
          setHeroes(fixedHeroes);
          console.log(r.data);
        })
        .catch((err) => console.log(err));
    }
    getHeroes();
    //eslint-disable-next-line
  }, []);
  console.log(heroes);
  return <div>
    {
      heroes && heroes.map((h, i) => (
        <div key={i}>
          <p>{h.name}</p>
        </div>
      ))
    }
  </div>;
};

export default General;
