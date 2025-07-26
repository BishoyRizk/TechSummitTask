import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as note from './service/note.service.js'
import { createNote, deleteNote, summarize } from "./note.validation.js";
const router = Router()


router.post('/create',authentication(),validation(createNote),note.createNote)
router.delete('/delete/:noteId',authentication(),validation(deleteNote),note.deleteNote)
router.post('/:noteId/summarize',authentication(),validation(summarize),note.summarizeNotes)


export default router