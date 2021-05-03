const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
export class pokemon {
    name: string;
    HP: Number;
    atackDmg: Number;
    defence : Number;

    constructor(name: string, HP: Number, atackDmg: Number, defence: Number) {
        this.name = name;
        this.HP = HP;
        this.atackDmg = atackDmg;
        this.defence = defence;
    }

}
    export async function pokemonInit() {
        let firstPokemonName = "pikachu";
        let secondPokemonName = "ditto";
        var firstPokemonInfo = await getPokemonInfos(firstPokemonName);
        var secondPokemonInfo = await getPokemonInfos(secondPokemonName);
        const  firstPokemon = new pokemon(firstPokemonName, firstPokemonInfo.stats[0].base_stat, firstPokemonInfo.stats[1].base_stat, firstPokemonInfo.stats[2].base_stat);
        const  secondPokemon = new pokemon(secondPokemonName, secondPokemonInfo.stats[0].base_stat, secondPokemonInfo.stats[0].base_stat, secondPokemonInfo.stats[0].base_stat);
        console.log(firstPokemon);
        console.log(secondPokemon);
        battle(firstPokemon, secondPokemon);
    }

    export async function getPokemonInfos(pokemonName) {
        const fetch = require("node-fetch");
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    async function battle (pokemonOne, pokemonTwo)
    {
        var pokemonTab = [pokemonOne, pokemonTwo]
        var whoAttacks = await batteInitialisation(pokemonTab[0].name, pokemonTab[1].name);
        while (pokemonTab[0].HP > 0 && pokemonTab[1].HP > 0)
        {
            if (whoAttacks == pokemonTab[0].name)
            {
                pokemonTab = await round(pokemonTab[0], pokemonTab[1]);
                whoAttacks = pokemonTab[1].name;
            }
            else
            {
                pokemonTab = await round(pokemonTab[1], pokemonTab[0]);
                whoAttacks = pokemonTab[0].name;
            }

        }
        console.log("Game Over")
        if (pokemonOne.HP <= 0)
            console.log(pokemonTwo.name + " won !");
        else
            console.log(pokemonOne.name + " won !")

    }


    async function batteInitialisation (pokemonOneName, pokemonTwoName)
    {
        var firstPlayer = await whoBegins(pokemonOneName, pokemonTwoName);
        return firstPlayer;
    }

    async function whoBegins(pokemonOneName, pokemonTwoName)
    {
        let nb = Math.round(Math.random() * 10);
        if (nb%2 == 0)
        {
            console.log("Le pokemon qui va commencer est : " + pokemonOneName);
            return pokemonOneName;
        }
        else
        {
            console.log("Le pokemon qui va commencer est : " + pokemonTwoName);
            return pokemonTwoName;
        }
    }

    async function round (pokemonAttack, pokemonDef)
    {
        console.log(pokemonAttack.name + " is attacking " + pokemonDef.name + " !" );
        pokemonDef.HP -= Math.round(2 / 5 + 2 * pokemonAttack.atackDmg * 2 / pokemonDef.defence);
        console.log(pokemonDef.name + " has " + pokemonDef.HP + " left !");
        var pokemonTab = [pokemonAttack, pokemonDef];
        await sleep(1000);
        return pokemonTab;
    }
