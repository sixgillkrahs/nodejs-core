import express, { ErrorRequestHandler } from "express";
import { requestId } from "./middleware/requestId";
import { setupSecurityHeaders } from "./middleware/securityHeaders";
import cors from 'cors'
import { ENV } from "./config/env";
import { compressionMiddleware } from "./middleware/performanceMiddleware";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter";
import { loggingMiddleware } from "./middleware/loggingMiddleware";
import { metricsMiddleware } from "./middleware/monitoringMiddleware";
import monitoringRoutes from "@/routes/monitoring.routes";
import heroRoutes from "@/routes/hero.routes";
import swaggerUi from 'swagger-ui-express';
import { specs } from './docs/swagger';
import { errorHandler } from "./middleware/errorHandler";
import { cache } from "./middleware/cacheMiddleware";
import { notFoundHandler } from "./middleware/notFound";
import userRoutes from '@/routes/user.routes'
import permissionRoutes from "./routes/permission.routes";

const app = express();

const setupMiddleware = (app: express.Application) => {
    // Security
    app.use(requestId);
    setupSecurityHeaders(app as express.Express);
    app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));

    // Performance
    app.use(compressionMiddleware);
    app.use(express.json({
        limit: "10kb"
    }));

    // Monitoring
    app.use(loggingMiddleware);
    app.use(metricsMiddleware);

    // Rate Limiting
    app.use("/api/auth", authLimiter);
    app.use("/api", apiLimiter);
};

setupMiddleware(app);

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
    });
});

app.use("/api/users", userRoutes);

const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: true
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Express TypeScript API Documentation"
};

app.use("/api/monitoring", monitoringRoutes);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs, swaggerOptions));
console.log(app._router?.stack);

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    return errorHandler(err, req, res, next);
};

app.use(errorMiddleware);
app.use("/api/users", cache({ duration: 300 }));
app.use("/api/hero", heroRoutes)
app.use("/monitoring", monitoringRoutes);
app.use("/api/permissions", permissionRoutes);
// Add this as the last middleware (before error handler)
app.use(notFoundHandler);



export default app;