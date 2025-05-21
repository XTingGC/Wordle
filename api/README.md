
# Wordle API

API para jugar al clásico juego de adivinanzas de palabras de 5 letras: **Wordle**.

## 🧠 Descripción

Esta API permite crear partidas, realizar intentos de adivinar la palabra y consultar el estado actual del juego. Cada juego tiene una dificultad seleccionable y un número limitado de intentos.

---

## 🚀 Endpoints

### 1. `POST /game`
Inicia una nueva partida.

#### Request (opcional):
```json
{
  "difficulty": "medium" 
}
```

#### Response (201):
```json
{
  "gameId": "abc123"
}
```

---

### 2. `POST /game/{gameId}/guess`
Envía una palabra de 5 letras como intento para adivinar.

#### Params:
- `gameId` (en la URL): ID de la partida.
- `guessWord` (en query): palabra de 5 letras a adivinar.

#### Ejemplo de Request:
`POST /game/abc123/guess?guessWord=perro`

#### Response (200):
```json
{
  "result": "2 posición y letra correcta, 1 posición incorrecta y letra correcta, 2 letra no existe en la palabra",
  "attemptsLeft": 4,
  "isGameWon": false
}
```

---

### 3. `GET /game/{gameId}`
Consulta el estado actual de la partida.

#### Params:
- `gameId` (en la URL): ID de la partida.

#### Response (200):
```json
{
  "gameId": "abc123",
  "status": 0,
  "attemptsLeft": 4,
  "wordToGuess": "perro",
  "guesses": [
    {
      "guessWord": "perro",
      "result": "2 posición y letra correcta, 1 posición incorrecta y letra correcta, 2 letra no existe en la palabra"
    }
  ]
}
```

---

## ❌ Errores comunes

### 400 - Solicitud incorrecta
```json
{
  "error": "La palabra debe tener exactamente 5 letras"
}
```

### 404 - Juego no encontrado
```json
{
  "error": "Juego con ID 'abc123' no encontrado"
}
```

---

## 📦 Instalación y uso local

1. Clona el repositorio y entra a la carpeta:
   ```bash
   git clone <repo-url>
   cd api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor:
   ```bash
   node server.js
   ```

---

## ✍️ Autor

Desarrollado como una API educativa para replicar la experiencia de Wordle mediante una REST API.


---

### 🧪 Ejemplos de adivinanzas

> Supongamos que la palabra correcta es `ESAVE`.

#### ✅ Palabra totalmente correcta:
`POST /game/abc123/guess?guessWord=esave`

```json
{
  "result": "22222",
  "attemptsLeft": 5,
  "isGameWon": true
}
```

#### ❌ Palabra totalmente incorrecta:
`POST /game/abc123/guess?guessWord=limón`

```json
{
  "result": "00000",
  "attemptsLeft": 5,
  "isGameWon": false
}
```

#### ⚠️ Palabra parcialmente correcta:
`POST /game/abc123/guess?guessWord=salto`

```json
{
  "result": "01000",
  "attemptsLeft": 5,
  "isGameWon": false
}
```
