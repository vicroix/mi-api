const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

let pokemons = [
  {
    id: 1,
    nombre: "Bulbasur",
    tipo: "Grass/Poison",
  },
  {
    id: 2,
    nombre: "Charmander",
    tipo: "Fire",
  },
  {
    id: 3,
    nombre: "Squirtle",
    tipo: "Water",
  },
  {
    id: 4,
    nombre: "Caterpie",
    tipo: "Bicho",
  },
  {
    id: 5,
    nombre: "Butterfree",
    tipo: "Bicho/Volador",
  },
  {
    id: 6,
    nombre: "Pidgey",
    tipo: "Normal/Volador",
  },
  {
    id: 7,
    nombre: "Rattata",
    tipo: "Normal",
  },
  {
    id: 8,
    nombre: "Ekans",
    tipo: "Veneno",
  },
  {
    id: 9,
    nombre: "Spearow",
    tipo: "Normal/Volador",
  },
  {
    id: 10,
    nombre: "Sandslash",
    tipo: "Tierra",
  },
  {
    id: 11,
    nombre: "Nidoran",
    tipo: "Veneno",
  },
  {
    id: 12,
    nombre: "Nidorino",
    tipo: "Veneno",
  },
  {
    id: 13,
    nombre: "Clefairy",
    tipo: "Hada",
  },
  {
    id: 14,
    nombre: "Ninetales",
    tipo: "Fuego",
  },
  {
    id: 15,
    nombre: "Oddish",
    tipo: "Planta/Veneno",
  },
  {
    id: 16,
    nombre: "Gloom",
    tipo: "Planta/Veneno",
  },
  {
    id: 17,
    nombre: "Zubat",
    tipo: "Veneno/Volador",
  },
];

//Obtener lista de Pokemon
app.get("/api/pokemons", (req, res) => {
  const limit = parseInt(req.query.limit) || pokemons.length;
  const offset = parseInt(req.query.offset) || 0;
  const paginatedPokemons = pokemons.slice(offset, offset + limit);

  res.json({
    results: paginatedPokemons,
    total: pokemons.length,
  });
});

//Obtener un Pokemon por su ID
app.get("/api/pokemons/:id", (req, res) => {
  const pokemon = pokemons.find((p) => p.id === parseInt(req.params.id));
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ message: "Pokemon no encontrado" });
  }
});

//Actualizar un pokemon existente
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemons.findIndex((p) => p.id === id);
  if (index !== -1) {
    pokemons[index] = { ...pokemons[index], ...req.body };
    res.json(pokemons[index]);
  } else {
    res.status(404).json({ message: "Pokémon no encontrado" });
  }
});

// Eliminar un Pokemon
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pokemons = pokemons.filter((p) => p.id !== id);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API corriendo en http://localhost:${port}`);
});

