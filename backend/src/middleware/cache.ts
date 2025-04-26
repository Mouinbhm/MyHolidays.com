import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const cacheMiddleware = (duration: number) => async (req: Request, res: Response, next: Function) => {
  const key = `cache:${req.originalUrl}`;
  
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    next();
  }
};

// Utilisation dans les routes
router.get("/search", cacheMiddleware(300), async (req: Request, res: Response) => {
  // ... code existant
}); 