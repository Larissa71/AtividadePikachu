import React, {useState, useEffect, FormEvent} from "react";
import {FiChevronRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import api from '../../services/api';


import {Title, Form, Pokemonsinho, Error} from './Style'

interface Pokemon{
    dream_world: string;
    name: string;
    types: string[];
    abilities: string[];
    description: string;
    sprites: {other:{dream_world:{front_default:string}}}
}
 
const Dashboard: React.FC = () => {
    const [newPoke, setNewPoke] = useState('');
    const [inputError, setInputError] = useState('');
    const [Pokemons, setPokemons] = useState<Pokemon[]>(() => {
        const StoragePokemon = localStorage.getItem(
            '@GithubExplorer:Pokemons'
        );

        if(StoragePokemon){
            return JSON.parse(StoragePokemon)
        }

        return[];
    });

    const handleAddPokemon = async (event: FormEvent <HTMLFormElement>) =>{
        event.preventDefault();

        if(!newPoke){
            setInputError("Digite um Pokemon para pesquisar")
            return;
        }

    try {
        const response = await api.get<Pokemon>(`pokemon/${newPoke}`);
        const Pokemon = response.data;

        setPokemons([... Pokemons, Pokemon])
        setNewPoke('');
        setInputError('');

    } catch(err){
        setNewPoke('');
        setInputError("Pokemon não encontrado ou existente.");
    }
}

    useEffect(() => {
        localStorage.setItem(
            '@GitHubExplorer:Pokemons',
            JSON.stringify(Pokemons)
        )
    }, [Pokemons]);

    return (
        <>
            <Title>Busque mais sobre Pokemons</Title>
            <Form onSubmit={handleAddPokemon}>
                <input 
                    onChange={e => setNewPoke(e.target.value)}
                    placeholder= "Busque um Pokemon no repositório"
                />
                <button type="submit"> Pikachu</button>
            </Form> 

            {inputError && <Error>{inputError}</Error>}

            <Pokemonsinho>
                {Pokemons.map(Pokemon => (
                <Link to="#">
                    <img src={Pokemon.sprites.other.dream_world.front_default}/>
                    <div>
                        <strong>{Pokemon.name}</strong>
                        <p>{Pokemon.description}</p>
                    </div>
                    <FiChevronRight size={20}/>
                </Link>
                ))}
            </Pokemonsinho>

        </>
    );
}

export default Dashboard;