# Wordle Clone — React + TypeScript + Vite

Este proyecto es un clon del popular juego **Wordle**, desarrollado con **React**, **TypeScript** y **Vite**.

## 🚀 Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd frontend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura la API:**
   - Asegúrate de que la API de Wordle esté corriendo en `http://localhost:3000`.
   - Si necesitas cambiar la URL, crea un archivo `.env` en la raíz del frontend:
     ```env
     VITE_API_URL=http://localhost:3000
     ```

4. **Inicia la aplicación:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## ✅ Características principales

- Juega partidas de Wordle con validación de palabras.
- Colores visuales:
  - Verde: letra correcta y en la posición correcta.
  - Amarillo: letra correcta pero en posición incorrecta.
  - Gris: letra incorrecta.
- Mensaje de fin de juego al ganar o perder.
- Teclado virtual y soporte de teclado físico.
- Reinicio de partida.

## 🛠️ Tecnologías usadas
- React + TypeScript
- Vite
- Tailwind CSS (para estilos)
- ESLint + Prettier

## 📦 Estructura del proyecto

```
frontend/
  ├─ src/
  │   ├─ application/         # Casos de uso y lógica de negocio
  │   ├─ domain/              # Entidades y repositorios
  │   ├─ infrastructure/      # API, endpoints, normalización
  │   ├─ presentation/        # Componentes y hooks de React
  │   └─ ...
  ├─ public/
  ├─ index.html
  ├─ package.json
  └─ README.md
```
---

¡Disfruta jugando y aprendiendo con este clon de Wordle!
