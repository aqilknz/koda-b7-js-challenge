const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

async function getDataPokemon () {
    try {
        const response = await fetch(url) 
        if (!response.ok) {
            throw response.status
        }
        const result = await response.json()
        const pokemonList = result.results;

        const finalList = await Promise.all(
            pokemonList.map(async(pokemon) => {
                const detailResult = await fetch (pokemon.url)
                const detailAbility = await detailResult.json()

                return {
                    nama : pokemon.name,
                    abilities: detailAbility.abilities.map(item => item.ability.name)
                }
            })
        )
        console.log("output", finalList)
    } catch (err) {
        console.log("error", err)
    }
}
getDataPokemon()

// fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         const janjiDetail = data.results.map(p => 
//             fetch(p.url).then(res => res.json())
//         );
//         return Promise.all(janjiDetail);
//     })
//     .then(details => {
//         const hasil = details.map(d => ({
//             nama: d.name,
//             abilities: d.abilities.map(a => a.ability.name)
//         }));
//         console.log(hasil);
//     })
//     .catch(err => console.log(err));

