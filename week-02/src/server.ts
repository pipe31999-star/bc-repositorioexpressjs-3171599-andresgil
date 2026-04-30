import app from './app';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Iniciar servidor Express
 */
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   Call Center API - Express + TypeScript    ║
╠════════════════════════════════════════════╣
║ ${`Servidor ejecutándose en puerto ${PORT}`.padEnd(42)}║
║ ${`Entorno: ${NODE_ENV}`.padEnd(42)}║
║ ${`URL: http://localhost:${PORT}/api/v1/agents`.padEnd(42)}║
╚════════════════════════════════════════════╝
  `);
});

/**
 * Graceful Shutdown
 */

// Manejar SIGTERM (señal de terminación)
process.on('SIGTERM', () => {
  console.log('\n[SIGTERM] Señal recibida. Cerrando servidor gracefully...');
  gracefulShutdown();
});

// Manejar SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\n[SIGINT] Señal recibida. Cerrando servidor gracefully...');
  gracefulShutdown();
});

// Manejar errores no capturados
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException] Error no capturado:', err);
  gracefulShutdown();
});

// Manejar rechazos de promesas no gestionados
process.on('unhandledRejection', (reason, promise) => {
  console.error('[unhandledRejection] Rechazo sin manejar:', reason);
  gracefulShutdown();
});

/**
 * Función para cerrar el servidor gracefully
 */
function gracefulShutdown(): void {
  // Detener de recibir nuevas conexiones
  server.close(() => {
    console.log('[INFO] Servidor cerrado correctamente');
    process.exit(0);
  });

  // Timeout por seguridad: forzar salida después de 10 segundos
  setTimeout(() => {
    console.error('[ERROR] No se pudo cerrar gracefully. Forzando salida...');
    process.exit(1);
  }, 10000);
}

export default server;
