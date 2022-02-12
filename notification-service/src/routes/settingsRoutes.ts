import { Router } from "express";
import { SettingsController } from "../controllers/settingsController";
import auth from "../middleware/auth";


const settingsRouter = Router();

settingsRouter.get('/', auth, SettingsController.readSettings);

settingsRouter.post('/', auth, SettingsController.createUpdateSettings);

settingsRouter.delete('/', auth, SettingsController.deleteSettings);

export { settingsRouter };
