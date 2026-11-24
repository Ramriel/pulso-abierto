# Pulso Abierto - Criptomonedas

Aplicación web desarrollada con **React**, **TypeScript** y **Vite** para consultar precios de criptomonedas (Bitcoin, Ethereum y Solana), acceder a su vista de detalle, gestionar favoritos persistentes y filtrar mediante un formulario controlado.

## Características

- **Componentes con React y TypeScript:** Interfaz organizada en componentes reutilizables (`CryptoCard`, `CryptoDetail`, `CryptoSearchForm`, `NotFound`).
- **Rutas dinámicas con React Router:** Navegación entre el listado principal (`/`), la vista de detalle (`/criptomonedas/:id`) y ruta de respaldo (`*`).
- **Formulario controlado y validación con Zod:** Búsqueda y filtrado de criptomonedas con validación mediante `safeParse`.
- **Consumo de API desacoplado:** Consulta de precios mediante servicio dedicado (`cryptoService.ts`).
- **Estado global y persistencia:** Gestión de favoritos con **Zustand** conservando los datos al recargar la página.
- **Pruebas automatizadas:** Cobertura básica con **Vitest** y **Testing Library**.

## Tecnologías principales

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **Zustand**
- **Zod**
- **Vitest y Testing Library**

## Instalación de dependencias

1. Clonar o descargar el repositorio.
2. Instalar las dependencias desde la raíz del proyecto:

```bash
npm install

## Verificación final

- **Pruebas ejecutadas:** `npm run test` ejecutado y aprobado correctamente (Vitest y Testing Library).
- **Build generado correctamente:** Sí (`npm run build` completado sin errores).
- **Preview comprobado:** Sí (`npm run preview` ejecutado y verificado en navegador: carga de datos, navegación entre listado y detalle, persistencia de favoritos y formulario).
- **Despliegue realizado:** Sí, publicado en Vercel desde el repositorio de GitHub.
- **Fecha de verificación:** 24/11/2026