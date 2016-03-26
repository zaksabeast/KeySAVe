import React from 'react';
import { Localization, Calculator as StatCalculator } from 'keysavcore';
import { defaultMemoize } from 'reselect';

const replaceDatabase = {
  0: 'B+(pkm.box+1)',
  1: 'Math.floor(this.slot/6)+1}+","+(this.slot%6+1)',
  2: 'local.species[pkm.species]',
  3: 'genderString(pkm.gender)',
  4: 'local.natures[pkm.nature]',
  5: 'local.abilities[pkm.ability]',
  6: 'pkm.ivHp',
  7: 'pkm.ivAtk',
  8: 'pkm.ivDef',
  9: 'pkm.ivSpAtk',
  10: 'pkm.ivSpDef',
  11: 'pkm.ivSpe',
  12: 'local.types[pkm.hpType]',
  13: '("0000" + pkm.esv).slice(-4)',
  14: '("0000" + pkm.tsv).slice(-4)',
  15: 'pkm.nickname',
  16: 'pkm.ot',
  17: 'local.getBallName(pkm.ball)',
  18: 'pkm.tid',
  19: 'pkm.sid',
  20: 'pkm.evHp',
  21: 'pkm.evAtk',
  22: 'pkm.evDef',
  23: 'pkm.evSpAtk',
  24: 'pkm.evSpDef',
  25: 'pkm.evSpe',
  26: 'moveName(local, pkm.move1)',
  27: 'moveName(local, pkm.move2)',
  28: 'moveName(local, pkm.move3)',
  29: 'moveName(local, pkm.move4)',
  30: 'moveName(local, pkm.eggMove1)',
  31: 'moveName(local, pkm.eggMove2)',
  32: 'moveName(local, pkm.eggMove3)',
  33: 'moveName(local, pkm.eggMove4)',
  34: 'pkm.isShiny ? " ★" : ""',
  35: 'pkm.isEgg ? "✓" : ""',
  36: 'StatCalculator.level(pkm)',
  37: 'local.regions[pkm.gameVersion]',
  38: 'local.countries[pkm.countryID]',
  39: 'pkm.heldItem ? local.items[pkm.heldItem] : ""',
  40: 'local.languageTags[pkm.otLang]',
  41: 'local.games[pkm.gameVersion]',
  42: 'pkm.slot+1',
  43: 'pkm.pid',
  44: 'pkm.gameVersion >= 24 && pkm.gameVersion <= 27 ? "⬟" : ""',
  45: 'pkm.species',
  46: 'pkm.form',
  47: 'pkm.ivHp === 31 ? "1" : ""',
  48: 'pkm.ivAtk === 31 ? "2" : ""',
  49: 'pkm.ivDef === 31 ? "3" : ""',
  50: 'pkm.ivSpAtk === 31 ? "4" : ""',
  51: 'pkm.ivSpDef === 31 ? "5" : ""',
  52: 'pkm.ivSpe === 31 ? "6" : ""',
  53: '(pkm.ivHp === 31) + (pkm.ivAtk === 31) + (pkm.ivAtk === 31) + (pkm.ivDef === 31) + (pkm.ivSpAtk === 31) + (iv.SpDef === 31) + (iv.Spe === 31)',
  54: 'pkm.ivHp + pkm.ivAtk + pkm.ivDef + pkm.ivSpAtk + pkm.ivSpDef + pkm.ivSpe',
  55: 'pkm.evHp + pkm.evAtk + pkm.evDef + pkm.evSpAtk + pkm.evSpDef + pkm.evSpe',
  56: 'formatDate(pkm.eggDate)',
  57: 'formatDate(pkm.metDate)',
  58: 'pkm.exp',
  59: 'props.index + 1',
  60: 'pkm.pkrsStrain ? "✓" : ""',
  61: 'pkm.pkrsStrain > 0 && pkm.pkrsDuration === 0 ? "✓" : ""',
  62: 'genderString(pkm.otGender)',
  63: 'pkm.levelMet',
  64: 'pkm.otFriendship',
  65: 'pkm.otAffection',
  66: 'pkm.isEgg ? pkm.otFriendship * 255 : ""',
  67: '"[](/" + Localization[self.props.language].items[this.ball].replace(" ", "").replace("é", "e").toLowerCase() + ")"',
  68: 'pkm.abilityNum === 4 ? "✓" : ""'
};

const compile = defaultMemoize(function compile(template) {
  /* eslint-disable no-unused-vars */
  function moveName(local, id) {
    return id ? local.moves[id] : '';
  }
  function formatDate(date) {
    return date[0] + '-' + ('0' + (date[1] + 1)).slice(-2) + '-' + ('0' + date[2]).slice(-2);
  }
  function genderString(gender) {
    switch (gender) {
      case 0:
        return '♂';
      case 1:
        return '♀';
      default:
        return '-';
    }
  }
  /* eslint-enable no-unused-vars */
  /* eslint-disable no-eval */
  return eval(
    'function(props) { var pkm = props.pkm, local = props.local; return React.createElement("div", null, "' +
    template.replace(/\\/, '\\\\').replace(/"/, '\\"').replace(/{(\d+)}/, (string, count) => `", ${replaceDatabase[count]}, "`) +
    '"); }'
  );
  /* eslint-enable no-eval */
});

const PkmListLegacy = ({ pokemon, format, language }) => {
  const Template = compile(format.format);
  const local = Localization[language];
  return (
    <div>
      {pokemon.map((e, i) => <Template key={e.box * 30 + e.slot} pkm={e} index={i} local={local} />)}
    </div>
  );
};

export default PkmListLegacy;
