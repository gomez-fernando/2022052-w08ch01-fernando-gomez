import { Router } from "express";

const router = Router();

router.get('/', (_req, resp) => {
    resp.send(`Robots API`)
});

export default router;