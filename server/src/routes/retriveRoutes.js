import { Router } from "express";
import { retriveCertificates,retriveProjects,retriveTechStacks } from "../controllers/retriveController.js";

const router  = Router();
router.route("/retriveCertificates").get(retriveCertificates)
router.route("/retriveProjects").get(retriveProjects)
router.route("/retriveTechStacks").get(retriveTechStacks)
export default router