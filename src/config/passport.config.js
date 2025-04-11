import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from './config';
import './config/passport.config.js';



// Extractor: saca el token desde la cookie "authToken"
export const cookiesExtractor = (req) => req.cookies?.authToken;

// Configuración de opciones para la estrategia JWT
const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookiesExtractor]),
  secretOrKey: config.JWT_SECRET,
}

// Definicion de la estrategia jwt
passport.use("jwt", new JwtStrategy(options,(jwt_payload, done) => {
  try {
    return done(null, jwt_payload);
  } catch (error) {
    return done(error, false);
  }
}))