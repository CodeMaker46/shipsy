import express from 'express';

const router = express.Router();

// Main home route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Shipsy API',
        version: '1.0.0',
        status: 'Server is running successfully!',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/auth',
            shipments: '/shipment',
            health: '/health',
            docs: '/api-docs'
        }
    });
});

// Health check route
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        memory: process.memoryUsage(),
        version: process.version
    });
});

// API info route
router.get('/info', (req, res) => {
    res.json({
        name: 'Shipsy API',
        description: 'A comprehensive shipment tracking and management API',
        version: '1.0.0',
        author: 'Shipsy Team',
        features: [
            'User Authentication & Authorization',
            'Shipment Tracking',
            'Real-time Status Updates',
            'RESTful API Design',
            'JWT Token Security'
        ],
        documentation: '/api-docs',
        support: 'support@shipsy.com'
    });
});

// API documentation route
router.get('/api-docs', (req, res) => {
    res.json({
        title: 'Shipsy API Documentation',
        version: '1.0.0',
        baseUrl: `${req.protocol}://${req.get('host')}`,
        endpoints: {
            authentication: {
                'POST /auth/login': 'User login',
                'POST /auth/register': 'User registration',
                'GET /auth/profile': 'Get user profile (protected)'
            },
            shipments: {
                'GET /shipment': 'Get all shipments (protected)',
                'GET /shipment/track/:trackingNumber': 'Track shipment by number',
                'POST /shipment': 'Create new shipment (protected)',
                'PUT /shipment/:id/status': 'Update shipment status (protected)',
                'DELETE /shipment/:id': 'Delete shipment (protected)'
            },
            system: {
                'GET /': 'API home page',
                'GET /health': 'Health check',
                'GET /info': 'API information',
                'GET /api-docs': 'This documentation'
            }
        },
        authentication: {
            type: 'Bearer Token (JWT)',
            header: 'Authorization: Bearer <token>',
            note: 'Protected routes require valid JWT token'
        }
    });
});

export default router;