import passport from "passport";

export const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: info?.message || "Unauthorized"
        });
      }

      req.user = user;
      next();
    })(req, res, next); 
  };
};
