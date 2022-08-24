export const parseRoninTo0x = (ronin) => {
  return ronin.replace('ronin:', '0x');
};

export const parse0xToRonin = (ronin) => {
  return ronin.replace('0x', 'ronin:');
};

export const haveRoninPrefix = (value) => {
  return String(value).includes('ronin:') ? value : `ronin:${value}`;
};
