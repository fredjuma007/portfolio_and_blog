import { category } from "./category"
import { post } from "./post"
import { contact } from "./contact"
import { project } from "./project"

export const schemaTypes = [category, post, contact, project]

export const schema = {
  types: schemaTypes,
}
