import { $ajax } from "../../script/api.js";
import { getSelectedOptions } from "../../script/category.js";
import { init } from "../../script/guessCard.js";
import ICONS from "../images/skillCards/icons/imports.js";
//import DETAILS from "../images/skillCards/details/imports.js";
import { getSkillCardContestPower } from "../utils/contestPower.js";

let SKILL_CARDS;
let SKILL_CARDS_BY_ID;

$ajax(
  {
    method:"get",
    url:"kkeGuessCard/gakumas-data/json/skill_cards.json",
    ste_header:"application/json",
    success:(x)=>{
      SKILL_CARDS=JSON.parse(x);
      SKILL_CARDS.forEach((skillCard) => {
        skillCard.id = parseInt(skillCard.id, 10);
        skillCard.unlockPlv = parseInt(skillCard.unlockPlv, 10);
        skillCard.upgraded = skillCard.upgraded == "TRUE";
        skillCard.conditions = skillCard.conditions;
        skillCard.cost = skillCard.cost;
        skillCard.effects = skillCard.effects;
        skillCard.limit = parseInt(skillCard.limit, 10) || null;
        skillCard.unique = skillCard.unique == "TRUE";
        skillCard.icon = ICONS[skillCard.id] || ICONS[`${skillCard.id}_1`];
        skillCard.forceInitialHand = skillCard.forceInitialHand == "TRUE";
        skillCard.pIdolId = parseInt(skillCard.pIdolId, 10) || null;
        skillCard.getDynamicIcon = idolId => ICONS[`${skillCard.id}_${idolId}`] || ICONS[skillCard.id];
        skillCard.contestPower = getSkillCardContestPower(skillCard);
      });
      SKILL_CARDS_BY_ID = SKILL_CARDS.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {}); 
      getSelectedOptions();
      init();
    }
  }
)

class SkillCards {
  static getAll() {
    return SKILL_CARDS;
  }

  static getById(id) {
    return SKILL_CARDS_BY_ID[id];
  }

  static getFiltered({
    rarities,
    types,
    plans,
    sourceTypes,
  }) {
    if( !(rarities&&types&&plans&&sourceTypes) ) return []
    return SKILL_CARDS.filter((skillCard) => {
      if (!rarities.includes(skillCard.rarity)) return false;
      if (!types.includes(skillCard.type)) return false;
      if (!plans.includes(skillCard.plan)) return false;
      if (!sourceTypes.includes(skillCard.sourceType)) return false;
      return true;
    });
  }
}

export default SkillCards;
