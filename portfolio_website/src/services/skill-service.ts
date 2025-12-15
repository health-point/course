import type { ISkill } from "../models/skills";

export interface ISkillService {
    getSkills() : Promise<readonly ISkill[]>
}