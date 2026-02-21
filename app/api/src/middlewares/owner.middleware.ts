// // apps/api/src/middlewares/owner.middleware.ts

// export const checkAdOwnership = (db: PrismaClient) => {
//   return asyncHandler(
//     async (req: Request, res: Response, next: NextFunction) => {
//       const { adId } = req.params;
//       const { tenantId } = req.context; // From AuthMiddleware

//       const ad = await db.ad.findUnique({ where: { id: adId } });

//       if (!ad || ad.tenantId !== tenantId) {
//         // We say 404 instead of 403 so the hacker doesn't even know the ad exists!
//         throw new ApiError(404, "Ad not found");
//       }

//       next();
//     },
//   );
// };
