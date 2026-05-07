import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import agentsRouter from './routes/agents.routes';

const app: Express = express();

// =================== MIDDLEWARES ===================

// 1. Parser de JSON bodies
app.use(express.json());

// 2. Logger personalizado
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Interceptar el método send para capturar el status code
  const originalSend = res.send;
  res.send = function (data: any) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${statusCode} - ${duration}ms`
    );

    return originalSend.call(this, data);
  };

  next();
});

// 3. Rutas
app.use('/api/v1/agents', agentsRouter);

// 4. Manejador 404 - Ruta no encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// 5. Manejador de errores global (4 parámetros, siempre último)
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `[ERROR] ${new Date().toISOString()} - ${err.message}`,
    err.stack
  );

  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

app.use(errorHandler);

export default app;
