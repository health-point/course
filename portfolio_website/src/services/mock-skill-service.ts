import type { ISkill } from "../models/skills";
import type { ISkillService } from './skill-service';

export class MockSkillService implements ISkillService {
  async getSkills(): Promise<readonly ISkill[]> {
    // имитация задержки со слабенького сервера)
    await new Promise(resolve => setTimeout(resolve, 2000));

    return [
      { title: 'Paint', icon: 'https://static.vecteezy.com/system/resources/previews/009/877/662/non_2x/pixel-art-paint-palette-and-brush-icon-for-8bit-game-on-white-background-vector.jpg' },
      { title: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { title: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { title: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { title: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { title: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { title: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { title: 'Sigma', icon: 'https://content.imageresizer.com/images/memes/Sigma-Male-meme-6.jpg' }, 
{ title: 'Pascal ABC', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4ndRvXP-ZIWQwwm5U3BgHQcZaLomW03LSg&s' },
    ];
  }
}