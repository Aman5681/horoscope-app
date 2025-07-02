import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

export class RateLimiter {
  private static instance: RateLimitRequestHandler;

  public static getLimiter(): RateLimitRequestHandler {
    if (!RateLimiter.instance) {
      RateLimiter.instance = rateLimit({
        windowMs: 60 * 1000,
        max: 5,
        message: 'Too many requests. Please try again later.'
      });
    }
    return RateLimiter.instance;
  }
}